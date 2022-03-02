//footer and navbar 
function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./nav.html'));
    console.log($('#footerPlaceholder').load('./footer.html'));
}
loadSkeleton();  //invoke the function
