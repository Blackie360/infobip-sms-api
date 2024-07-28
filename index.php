<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pet Vaccination SMS Service</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-image: url('https://img.freepik.com/free-vector/dog-collection_53876-17288.jpg?ga=GA1.1.108684603.1722073371&semt=sph');
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
        }
        .response {
            margin-top: 20px;
            padding: 10px;
            border-radius: 4px;
            display: none;
        }
        .response.success {
            background-color: #d4edda;
            color: #155724;
        }
        .response.error {
            background-color: #f8d7da;
            color: #721c24;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="mb-4">Pet Vaccination SMS</h1>
        <form action="" method="POST">
            <div class="form-group mb-3">
                <label for="ownerName" class="form-label">Owner's Name</label>
                <input type="text" id="ownerName" name="ownerName" class="form-control" placeholder="Enter owner's name" required>
            </div>
            <div class="form-group mb-3">
                <label for="phone" class="form-label">Phone Number</label>
                <input type="text" id="phone" name="phone" class="form-control" placeholder="Enter phone number with country code" required>
            </div>
            <div class="form-group mb-3">
                <label for="petType" class="form-label">Pet Type</label>
                <select id="petType" name="petType" class="form-select" required>
                    <option value="" disabled selected>Select Pet Type</option>
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="petName" class="form-label">Pet's Name</label>
                <input type="text" id="petName" name="petName" class="form-control" placeholder="Enter pet's name" required>
            </div>
            <div class="form-group mb-3">
                <label for="breed" class="form-label">Breed</label>
                <input type="text" id="breed" name="breed" class="form-control" placeholder="Enter breed" required>
            </div>
            <div class="form-group mb-3">
                <label for="age" class="form-label">Age</label>
                <input type="text" id="age" name="age" class="form-control" placeholder="Enter pet's age" required>
            </div>
            <div class="form-group mb-3">
                <label for="lastVaccination" class="form-label">Last Vaccination Date</label>
                <input type="date" id="lastVaccination" name="lastVaccination" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Send</button>
        </form>
        <div class="response" id="response"></div>
    </div>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $apiKey = 'bd92dcb4d66e373da4760a53fea72775-aaf9c806-8213-4873-8770-abadbb26c1be';
        $baseUrl = 'https://ppxmwl.api.infobip.com';

        $ownerName = htmlspecialchars($_POST['ownerName']);
        $phoneNumber = htmlspecialchars($_POST['phone']);
        $petType = htmlspecialchars($_POST['petType']);
        $petName = htmlspecialchars($_POST['petName']);
        $breed = htmlspecialchars($_POST['breed']);
        $age = htmlspecialchars($_POST['age']);
        $lastVaccination = htmlspecialchars($_POST['lastVaccination']);

        $message = "Hello $ownerName, your $petType $petName, a $breed of $age years, had its last vaccination on $lastVaccination.";

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $baseUrl . '/sms/1/text/single');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'from' => 'YOUR_SENDER_ID',
            'to' => $phoneNumber,
            'text' => $message
        ]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: App ' . $apiKey
        ]);

        $response = curl_exec($ch);
        $error = curl_error($ch);

        curl_close($ch);

        echo '<script>';
        if ($error) {
            echo 'document.getElementById("response").classList.add("error");';
            echo 'document.getElementById("response").textContent = "Not Sent: ' . $error . '";';
        } else {
            $responseData = json_decode($response, true);
            if (isset($responseData['messages'][0]['status']['groupId']) && $responseData['messages'][0]['status']['groupId'] == 1) {
                echo 'document.getElementById("response").classList.add("success");';
                echo 'document.getElementById("response").textContent = "Sent";';
            } else {
                echo 'document.getElementById("response").classList.add("error");';
                echo 'document.getElementById("response").textContent = "Not Sent: ' . $responseData['messages'][0]['status']['description'] . '";';
            }
        }
        echo 'document.getElementById("response").style.display = "block";';
        echo '</script>';
    }
    ?>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
