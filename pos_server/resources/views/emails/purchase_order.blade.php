<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid black;
            margin-top: 20px;
        }

        table tr td {
            border: 1px solid black;
            padding: 5px;
            text-align: center;
        }
    </style>
</head>
@php
$medicine = json_decode($mail_data['data'], true);
@endphp

<body>
    <h1>Purchase Order</h1>
    <p>{{ $mail_data['message'] }}</p>
    <table>
        <tr>
            <td>Name</td>
            <td>Pkt Size</td>
            <td>No Of Box</td>
            <td>Quantity</td>
            <td>MRP</td>
            <td>Total Price</td>
        </tr>
        @foreach ($medicine as $item)
        <tr>
            <td>{{ $item['macrohealth_sg'] }}</td>
            <td>{{ $item['pktSize'] }}</td>
            <td>{{ $item['noOfBox'] }}</td>
            <td>{{ $item['pcs'] }}</td>
            <td>{{ $item['price'] }}</td>
            <td>{{ $item['totalPrice'] }}</td>
        </tr>
        @endforeach
    </table>


</body>

</html>