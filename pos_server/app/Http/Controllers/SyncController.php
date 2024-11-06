<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\invoice_details;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

class SyncController extends Controller
{
    public function index(Request $request)
    {
        Config::set('database.connections.mysql.database', $request->db);
        app('db')->purge();
        $invoice = $request->invoice;

        foreach ($invoice as $key => $value) {
            $already_exist = Invoice::where('ref_invoice', $value['invoice_no'])->first();
            if (!$already_exist) {
                $maxInvoiceNo = Invoice::max('invoice_no');
                if ($maxInvoiceNo) {
                    $maxInvoiceNoNumber = intval(str_replace('INV-', '', $maxInvoiceNo));
                    $newInvoiceNoNumber = $maxInvoiceNoNumber + 1;
                } else {
                    $newInvoiceNoNumber = 10001;
                }
                $newInvoiceNo = 'INV-' . str_pad($newInvoiceNoNumber, 5, '0', STR_PAD_LEFT);
                $data = new Invoice();
                $data->invoice_no = $newInvoiceNo;
                $data->member_id = $value['member_id'];
                $data->ref_invoice = $value['invoice_no'];

                $data->sub_total = $value['sub_total'];
                $data->vat_tax_amount = $value['vat_tax_amount'];
                $data->payment_status = $value['payment_status'];
                $data->delete_status = $value['delete_status'];

                $data->grand_total = $value['grand_total'];
                $data->discount_type = $value['discount_type'];
                $data->discount_amount = $value['discount_amount'];
                $data->due_amount = $value['due_amount'];

                $data->special_discount = $value['special_discount'];
                $data->paid_amount = $value['paid_amount'];
                $data->return_amount = $value['return_amount'];
                $data->invoice_from = $value['invoice_from'];
                $data->created_by = $value['created_by'];
                $data->invoice_type = $value['invoice_type'];
                $data->is_sync = 1;
                $data->prescription_image = $value['prescription_image'];
                $data->save();
                foreach ($value['invoice_details'] as $key => $dt) {
                    $invoice_details = new invoice_details();
                    $invoice_details->invoice_master_id = $data->id;
                    $invoice_details->drug_id = $dt['drug_id'];
                    $invoice_details->no_of_box_or_leaf = $dt['no_of_box_or_leaf'];
                    $invoice_details->qty = $dt['qty'];
                    $invoice_details->total_price = $dt['total_price'];
                    $invoice_details->toal_price_witout_discount = $dt['toal_price_witout_discount'];
                    $invoice_details->payment_status = $data->payment_status;
                    $invoice_details->delete_status = $dt['delete_status'];
                    $invoice_details->cash_drug_discount = null;
                    $invoice_details->card_drug_discount = null;
                    $invoice_details->digital_drug_discount = null;
                    $invoice_details->save();

                    $stock = Stock::where('drug_id', $dt['drug_id'])->first();
                    if ($stock) {
                        $stock->stock = $stock->stock - $dt['qty'];
                        $stock->save();
                    }
                }
            }
        }
        $invoices = Invoice::with('invoice_details')->where('invoice_no', '>', $request->last_invoice)->get();
        return response()->json([
            'status' => 200,
            'data' => $invoices,
        ]);
    }

    public function sync(Request $request)
    {
        // Send request to live server 
        $last_local_invoice = Invoice::where(['is_sync' => 1])->orderBy('id', 'desc')->first();
        // return $last_local_invoice;
        $local_invoice = Invoice::where(['invoice_type' => 'offline', 'is_sync' => 0])
            ->with('invoice_details')
            ->get();
        $data = [
            'db' => $request->db,
            'invoice' => $local_invoice,
            'last_invoice' => $last_local_invoice ? $last_local_invoice->invoice_no : 0,
        ];
        if (count($local_invoice) < 1) {
            return response()->json(['message' => 'No data to send.'], 503);
        }
        // $response = Http::post('http://localhost:7001/api/sync-online', $data);
        $response = Http::post('https://posbackend.macrohealthplus.org/api/sync-online', $data);
        $last_online_invoice = $response->json();
        $online_invoices = $last_online_invoice['data'];
        if ($response->successful()) {
            if (count($online_invoices) > 0) {
                foreach ($local_invoice as $key => $in) {
                    $in->delete();
                }
                foreach ($online_invoices as $key => $value) {
                    $data = new Invoice();
                    $data->invoice_no = $value['invoice_no'];
                    $data->member_id = $value['member_id'];
                    $data->ref_invoice = $value['ref_invoice'];

                    $data->sub_total = $value['sub_total'];
                    $data->vat_tax_amount = $value['vat_tax_amount'];
                    $data->payment_status = $value['payment_status'];
                    $data->delete_status = $value['delete_status'];

                    $data->grand_total = $value['grand_total'];
                    $data->discount_type = $value['discount_type'];
                    $data->discount_amount = $value['discount_amount'];
                    $data->due_amount = $value['due_amount'];

                    $data->special_discount = $value['special_discount'];
                    $data->paid_amount = $value['paid_amount'];
                    $data->return_amount = $value['return_amount'];
                    $data->invoice_from = $value['invoice_from'];
                    $data->created_by = $value['created_by'];
                    $data->invoice_type = $value['invoice_type'];
                    $data->is_sync = 1;
                    $data->prescription_image = $value['prescription_image'];
                    $data->save();
                    foreach ($value['invoice_details'] as $key => $dt) {
                        $invoice_details = new invoice_details();
                        $invoice_details->invoice_master_id = $data->id;
                        $invoice_details->drug_id = $dt['drug_id'];
                        $invoice_details->no_of_box_or_leaf = $dt['no_of_box_or_leaf'];
                        $invoice_details->qty = $dt['qty'];
                        $invoice_details->total_price = $dt['total_price'];
                        $invoice_details->toal_price_witout_discount = $dt['toal_price_witout_discount'];
                        $invoice_details->payment_status = $data->payment_status;
                        $invoice_details->delete_status = $dt['delete_status'];
                        $invoice_details->cash_drug_discount = null;
                        $invoice_details->card_drug_discount = null;
                        $invoice_details->digital_drug_discount = null;
                        $invoice_details->save();
                    }
                }
            } else {
                foreach ($local_invoice as $key => $in) {
                    $in->is_sync = 1;
                    $in->ref_invoice = $in['invoice_no'];
                    $in->save();
                }
            }

            return response()->json([
                'message' => 'Data sent successfully!',
                'response' => $online_invoices,
                'local_invoice' => $local_invoice,
                'data' => $last_online_invoice,
                'last_local_invoice' =>  $last_local_invoice

            ]);
        } else {
            return response()->json(['message' => 'Failed to send data.', 'error' => $response->body()], $response->status());
        }
    }
    public function availableForSync()
    {
        $local_invoice = Invoice::where(['invoice_type' => 'offline', 'is_sync' => 0])
            ->with('invoice_details')
            ->get();
        return response()->json([
            'data' => $local_invoice,
            'count' => count($local_invoice),
        ]);
    }
}
