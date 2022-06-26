 const selectedLang =   $('#mySelect').find('option').each(function(i,e){
        if($(e).val() == localStorage.getItem("langSelected")){
            $('#mySelect').prop('selectedIndex',i);
            
                console.log(e.value)
            
        }
    });

