<?php
//* es un comodin para desplegar la información a cualquier servidor que realice la peticion.
header("Access-Control-Allow-Origin: *");

//Debemos dar permisos de acuerdo a la llamada o metodo que necesites GET,POST,UPDATE.
header('Access-Control-Allow-Methods, GET, POST');

// fichero directamente
header("Content-Type: application/json");
$fichero =  "espacios-naturales.json";

// fichero a traves de parametro
//$fichero =  $_GET["fichero"];

if (file_exists($fichero)) {
	$output = file_get_contents($fichero);
	header('Content-Type: application/json');
	echo $output;
}
else {
	header('Content-Type: application/json');
	echo json_encode(["error" => "No existe el fichero"]);
}
?>

