<?php

include 'vendor/autoload.php';

function json($value)
{
    header('Content-Type: application/json');
    die(json_encode($value));
}

function error($message) {
    json([
        'status' => 'error',
        'message' => $message
    ]);
}

chdir(sys_get_temp_dir());

$gpx = trim($_POST['gpx']);
if (empty($gpx)) {
    error("No GPX input provided!");
}

$speed = trim($_POST['speed'] ?? '');
if (empty($speed)) {
    $speed = 5;
}
if (!is_numeric($speed)) {
    error("Invalid speed given.");
}

$reverse = (isset($_POST['reverse']) && $_POST['reverse'] == 'true') ? '--reverse' : '';

file_put_contents('input.gpx', $gpx);

$command = 'gips.rb --speed '.$speed.' '.$reverse.' input.gpx output.gpx';

exec($command);
$output = file_get_contents('output.gpx');

unlink('output.gpx');
unlink('input.gpx');

json([
    'status' => 'success',
    'gpx' => $output
]);