const loginElements = (function ($) {
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

	const init = (function () {
		const setHTMLObjects = (function () {
			userInfoField = $("#user-info");
			$message = $("<div>", {
				class: "message"
			});
			loginForm = $("<div>", {
				id: "login-form"
			});
			btnDiv = $("<div>", {
				class: "form-group"
			});
			btnLogin = $("<button>", {
				class: "fas fa-sign-in-alt btn btn-regular",
				id: "header-login-btn",
				type: "button"
			});
			usrDiv = $("<div>", {
				class: "form-group"
			});
			usrField = $("<input>", {
				class: "form-control",
				type: "text",
				id: "username",
				name: "username",
				placeholder: "Brukernavn"
			});
			pwdDiv = $("<div>", {
				class: "form-group"
			});
			pwdField = $("<input>", {
				class: "form-control",
				id: "pwd-field",
				type: "password",
				name: "pass",
				placeholder: "Passord"
			});
			loggedInData = $("<a>", {
				class: "nav-item nav-link"
			});
			usrData = $("<p>", {
				class: "usasd"
			});
			signOutBtn = $("<i>", {
				class: "fas fa-sign-out-alt"
			});
		})();

		const setGUI = (function () {
			appendElements();
		})();

		const setEvents = (function () {
			userInfoField.on("click", "div button", function (e) {
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
						username: usrData,
						pass: pwdData
					}),
					success: successFunction()
				});
			});

			userInfoField.on("click", "a i", function (e) {
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
		})();

	})();

	function appendElements() {
		let data = JSON.parse(Cookies.getJSON("data").substring(2));
		console.log(data);

		if (data.user) {
			successFunction();
		} else {
			logoutFunction();
		}
	}

	function successFunction() {
		userInfoField.empty();

		loggedInData.append(usrIcon, usrData, signOutBtn);
		userInfoField.append(loggedInData);
	}

	function logoutFunction() {
		userInfoField.empty();
		usrDiv.append(usrField);
		pwdDiv.append(pwdField);
		btnDiv.append(btnLogin);
		loginForm.append(usrDiv, pwdDiv, btnDiv);
		userInfoField.append(loginForm);
	}

	function failFunction(request, textStatus, errorThrown) {
		$message.text(
			"An error occured during your request: " +
			request.status +
			" " +
			textStatus +
			" " +
			errorThrown
		);
		userInfoField.empty();
		userInfoField.append($message);
	}
})(jQuery);