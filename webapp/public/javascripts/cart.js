const cartModule = (function()	{

	let acc = document.getElementsByClassName("accordion");
	let i;

		
	

	for (i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function () {
			let accordionClass = this.id;
			
			accordions = document.getElementsByClassName(accordionClass);
			carets = document.getElementsByClassName("fas");

			for (let i = 0; i < accordions.length; i++)	{
				if (accordions[i].classList.contains("panel")) {
					accordions[i].classList.remove("panel");
				} else {
					accordions[i].classList.add("panel");
				}
			}
			for (let i = 0; i < carets.length; i++)	{
				if (carets[i].classList.contains("fa-caret-down")) {
					carets[i].classList.remove("fa-caret-down");
					carets[i].classList.add("fa-caret-up");
				}	else	{
					carets[i].classList.remove("fa-caret-up");
					carets[i].classList.add("fa-caret-down");
				}
			}

		});
	}

})();