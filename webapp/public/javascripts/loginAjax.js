(function ($)	{
	"use strict";
	//HTML Objects
	let userInfoField;
	let loginForm;
	let btnLogin;
	let usrField;
	let pwdField;

	let loggedInData;
	let usrIcon;
	let usrData;
	let signOutBtn;



	const init =	function()	{
		const setHTMLObjects = function()	{
			userInfoField = $("#user-info");
			loginForm = $("<form>",	{
				id: "login-form",
				action: "/login",
				method: "POST"
			});
			btnLogin = $("<input>",	{
				id: "login-btn",
				type: "submit",
				value: "Logg Inn"
			});
			usrField = $("<input>",{
				type: "text",
				id: "username",
				name: "pass",
				placeholder: "Brukernavn"
			});
			pwdField = $("<input>",	{
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
					type: "POST",
					contentType: "application/json",
					dataType: "json",
					cache: "false",
					data: JSON.stringify({
						username: usrField,
						pass: pwdField
					})
				}).done(loginFunction).fail(failFunction);
			});
		}();

		const setGUI	= function()	{
			appendElements();
		}();


	}();

	function appendElements()	{
		let x = document.cookie;
		console.log(x);
		

		if(x.data)	{
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
			loginForm.append(
				usrField,
				pwdField,
				btnLogin
			);
			userInfoField.append(loginForm);
		}
	}

	function loginFunction(returverdi)	{
		let userdata = document.cookie.data;
		console.log(userdata);
		
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

	function logoutFunction(returverdi)	{
		userInfoField.empty();
		loginForm.append(
			usrField,
			pwdField,
			btnLogin
		);
		userInfoField.append(loginForm);
	}

	function failFunction(request, textStatus, errorThrown)	{
		 $message.text("An error occured during your request: " + request.status + " " + textStatus + " " + errorThrown);
	}
})(jQuery);