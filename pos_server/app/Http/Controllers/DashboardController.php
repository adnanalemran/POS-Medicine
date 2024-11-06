<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\Membership;
use Carbon\Carbon;
use Illuminate\Http\Request;
use stdClass;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function revenue()
    {
        // $currentYear = Carbon::createFromFormat('Y')->format('Y');
        $invoices = array();
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        foreach ($months as $key => $value) {
            $invoice = Invoice::whereRaw('YEAR(created_at) =' . 2023)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->sum('sub_total');
            // ->get();
            $amount = number_format($invoice, 2, '.', '');
            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Income = floatval($amount);
            array_push($invoices, $monthly_income);
        }

        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'all' => $invoices
        ]);
    }
    public function members()
    {

        $members = array();
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        foreach ($months as $key => $value) {
            $member = Membership::whereRaw('YEAR(created_at) =' . 2023)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->count();

            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Customers = $member;
            array_push($members, $monthly_income);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'all' => $members
        ]);
    }
    public function invoice()
    {

        $members = array();
        $months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        foreach ($months as $key => $value) {
            $member = Invoice::whereRaw('YEAR(created_at) =' . 2023)
                ->whereRaw('MONTH(created_at) =' . $key + 1)
                ->count();

            $monthly_income = new stdClass();
            $monthly_income->name = $value;
            $monthly_income->Invoices = $member;
            array_push($members, $monthly_income);
        }
        return response()->json([
            'status' => 200,
            'message' => 'Data Added Successfully',
            'all' => $members
        ]);
    }
}
