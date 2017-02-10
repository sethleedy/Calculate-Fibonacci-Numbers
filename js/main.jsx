'use strict';

//// Start the reactjs class
//test

// For the input tags
var FieldGroup = React.createClass({
	render: function() {
		return (
			<ReactBootstrap.FormGroup controlId={this.props.id}>
			  <ReactBootstrap.ControlLabel>{this.props.label}</ReactBootstrap.ControlLabel>
			  <ReactBootstrap.FormControl placeholder={this.props.placeholder} />
			  {this.props.help && <ReactBootstrap.HelpBlock>{this.props.help}</ReactBootstrap.HelpBlock>}
			</ReactBootstrap.FormGroup>
  		);
	}
});


// FOutputComp
var FOutputComp = React.createClass({
	
	createDisNumbers: function(listItems) {
		
		var DisNumbers = (

			<div>
				<ReactBootstrap.Panel header="Calulation Results" bsStyle="info">
					<ul>
						{ listItems }
					</ul>
				</ReactBootstrap.Panel>
				<form onSubmit={this.onFormSubmitStartOver}>
					<ReactBootstrap.Button name="btnStartOver" type="submit" bsStyle="info" block>Start Over</ReactBootstrap.Button>
				</form>
			</div>
		);
		
		return DisNumbers;	
	},
	createDisInputForm: function() {
		
		var DisInputForm = (
			<div>
				<ReactBootstrap.Panel header="Calculate Fibonacci Numbers" bsStyle="primary">
					<form onChange={this.setField} onSubmit={this.onFormSubmit}>
						<FieldGroup id="fInput1" type="text" label="Input1" placeholder="Enter a number" />	
						<FieldGroup id="fInput2" type="text" label="Input2" placeholder="Enter a second, higher number" />
						<ReactBootstrap.Button name="btnCalculate" type="submit" bsStyle="primary" block>Calculate</ReactBootstrap.Button>
					</form>
				</ReactBootstrap.Panel>
			</div>
		);
		
		return DisInputForm;
	},
	
	onFormSubmitStartOver: function() {
		this.setState({DisplayOutput: this.DisInputForm});
	},
	
	componentWillMount: function() {
		
		// Output the Form for inputting the numbers
		
		var DisInputForm = this.createDisInputForm();

		this.setState({DisplayOutput: DisInputForm});
	},
	
	setField: function(e) {
  		this.setState({[e.target.id]: e.target.value})
	},
	onFormSubmit(e) {
		e.preventDefault()
		
		// Gather the data to pass as POST on the AJAX request
		var varPost={};
		//alert(JSON.stringify(this.state));
		varPost.number1=this.state.fInput1;
		varPost.number2=this.state.fInput2;
		//alert(JSON.stringify(varPost));
		
		// Send AJAX to server.
		$.post("process.php", varPost, this.parseNumbersAndSetState);
  	},
	
	parseNumbersAndSetState: function(reData) {

			//alert(JSON.stringify(reData));
			
			// Use retrieved data
			alert(reData.message); // reData is already an object to use from JSON.		
		
			// Get response and set state with response numbers.

			var numberTest = reData.fNumbers;
			
			// Test if we have numbers to use or FALSE.
			if (numberTest === false) {
				
				// Clear inputs
				
				// Set Focus
				
			} else {
				
				var listItems = numberTest.map((number) =>
				  <li key={number.toString()}>
					{number}
				  </li>
				);

				var DisNumbers = this.createDisNumbers(listItems);
				this.setState({DisplayOutput: DisNumbers});
				
			}
	},
	
	render: function() {

		return (
				<div>
					<ReactBootstrap.Grid>
						<ReactBootstrap.Row className="show-grid">
							<ReactBootstrap.Col sm={6} smOffset={3} xs={12}>

								{ this.state.DisplayOutput }

							</ReactBootstrap.Col>
						</ReactBootstrap.Row>
					</ReactBootstrap.Grid>
				</div>
		);
		
		
										 
		
	}
});


//// Done constructing the data

//// Display the data

ReactDOM.render(<FOutputComp />, document.getElementById("fNumbers"));