function showLog() {
	var div = document.getElementById('changelog');
	var nappi = document.getElementById('logbutton');
	if (div.style.display !== "none") {
		div.style.display = "none";
		nappi.innerHTML = "Show";
	} else {
		div.style.display = "block"
		nappi.innerHTML = "Hide";
	}
}