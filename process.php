<?php
// Do the Fibonacci numbers and spit out a JSON string


// Setup Vars


//var_dump($_REQUEST);

class fibonacciCompute {

	private $JSON_Output=array();
	
	function __construct() {
		$this->JSON_Output["fNumbers"] = false;
	}
	
	// Make sure the input is proper and that input #2 is higher than #1.
	public function checkFibo($n1=0,$n2=0) {		
		
		if ($n1 != 0 && $n2 != 0) {

			if ($n2 < $n1) {

				$this->JSON_Output["message"] =  "Your second number must be greater than the first. Try again";				

			}
			else if($n1 < 0 || $n2 < 0) {

				$this->JSON_Output["message"] = "Please enter only positive numbers";

			}
			else if ( !(is_numeric($n1)) || !(is_numeric($n2)) ) {

				$this->JSON_Output["message"] =  "Please only enter positive numbers";


			} else {

				$this->JSON_Output["message"] = "The result of your request is shown below.";
				$this->JSON_Output["fNumbers"] = $this->getFibo($n1, $n2);

			}

		} else {

			$this->JSON_Output["message"] = "Please enter values below";

		}

		return $this->JSON_Output;

	}


	// Compute
	public function getFibo($n1 = 0, $n2 = 0) {

		$max=$n2 * 100;
		$output = array();
		$z=0;

		while($z <= $max) {  

			$z = $n1 + $n2;

			array_push($output, $z);

			$n1 = $n2;

			$n2 = $z;

		}

		return $output;

	}

	// echo results in JSON



}


// Take inputs and compute Fibonacci numbers
	

	// Check summitted data
	if (isset($_REQUEST["number1"]) && isset($_REQUEST["number2"])) {

		if (is_numeric($_REQUEST["number1"]) && is_numeric($_REQUEST["number2"])) {

			$fNumbers = new fibonacciCompute();
			$computedResult = $fNumbers->checkFibo($_REQUEST["number1"],$_REQUEST["number2"]);

			header('Content-Type: application/json');
			echo json_encode($computedResult);
		}
	}

	
	

?>
