(function ($)	{
	"use strict";
	//HTML Objects
	let userInfoField;
	let loginForm;
	let btnDiv;
	let btnLogin;
	let usrDiv;
	let usrField;
	let pwdDiv;
	let pwdField;

	let loggedInData;
	let usrIcon;
	let usrData;
	let signOutBtn;
	let $message;



	const init =	function()	{
		const setHTMLObjects = function()	{
			userInfoField = $("#user-info");
			$message = $("<div>", {
				class: "message"
			});
			loginForm = $("<form>",	{
				id: "login-form"
			});
			btnDiv = $("<div>",	{
				class: "form-group"
			});
			btnLogin = $("<button>",	{
				class: "fas fa-sign-in-alt btn btn-regular",
				id: "header-login-btn",
				type: "submit"
			});
			usrDiv = $("<div>", {
				class: "form-group"
			});
			usrField = $("<input>",{
				class: "form-control",
				type: "text",
				id: "username",
				name: "username",
				placeholder: "Brukernavn"
			});
			pwdDiv = $("<div>", {
				class: "form-group"
			});
			pwdField = $("<input>",	{
				class: "form-control",
				id: "pwd-field",
				type: "password",
				name: "pass",
				placeholder: "Passord"
			});
			loggedInData = $("<a>", {
				class: "nav-item nav-link"
			});
			usrIcon = $("<i>", {
				class: "icons far fa-user"
			});
			usrData = $("<p>",{
				class: "usasd"
			});
			signOutBtn = $("<i>", {
				class: "fas fa-sign-out-alt"
			});
		}();
		
		const setEvents = function () {
			btnLogin.on("click", function (e) {
				let usrData = usrField.val();
				let pwdData = pwdField.val();
				
				e.preventDefault();
				
				$.ajax({
					url: "/login",
					type: "POST",
					contentType: "application/json",
					dataType: "json",
					cache: "false",
					data: JSON.stringify({
						"username": usrData,
						"pass": pwdData
					}),
					success: successFunction()
				});
			});

			signOutBtn.on("click", function(e)	{
				e.preventDefault();

				$.ajax({
					url: "/logout",
					type: "POST",
					contentType: "application/json",
					dataType: "json",
					cache: "false",
					success: logoutFunction()
				});
			});
		}();

		const setGUI	= function()	{
			appendElements();
		}();


	}();

	function appendElements()	{
		let x = document.cookies;
		console.log("cookie "+x);
			

		if(x.data.j.is_authenticated === true)	{
			userInfoField.empty();

			loggedInData.append(
				usrIcon,
				usrData,
				signOutBtn
			);
			userInfoField.append(
				loggedInData
			);
		} else	{
			userInfoField.empty();
			usrDiv.append(usrField);
			btnDiv.append(btnLogin);
			pwdDiv.append(pwdField);
			loginForm.append(
				usrDiv,
				pwdDiv,
				btnDiv
			);
			userInfoField.append(loginForm);
		}
	}

	function successFunction()	{
		let userdata = document.cookie.data;
		userInfoField.empty();

		loggedInData.append(
			usrIcon,
			usrData,
			signOutBtn
		);
		userInfoField.append(
			loggedInData
		);
	}

	function logoutFunction()	{
		userInfoField.empty();
		usrDiv.append(usrField);
		pwdDiv.append(pwdField);
		btnDiv.append(btnLogin);
		loginForm.append(
			usrDiv,
			pwdDiv,
			btnDiv
		);
		userInfoField.append(loginForm);
	}

	function failFunction(request, textStatus, errorThrown)	{
		$message.text("An error occured during your request: " + request.status + " " + textStatus + " " + errorThrown);
		userInfoField.empty();
		userInfoField.append($message);
	}
})(jQuery);