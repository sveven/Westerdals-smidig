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



	const init =	function()	{
		const setHTMLObjects = function()	{
			userInfoField = $("#user-info");
			loginForm = $("<form>",	{
				id: "login-form",
				action: "/login",
				method: "POST"
			});
			btnDiv = $("<div>",	{
				class: "form-group"
			});
			btnLogin = $("<input>",	{
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
          type: "POST",
          url: "/login",
					contentType: "application/json",
					dataType: "json",
					cache: "false",
					data: JSON.stringify({
						username: usrData,
						pass: pwdData
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