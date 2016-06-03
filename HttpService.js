class HttpService {
    
    get(url, contentType) {
        
        return new Promise((resolve, reject) => {
            

            let xhr = new XMLHttpRequest();
            
            xhr.open('GET', url);
            if(contentType)
                xhr.setRequestHeader("Content-type", contentType);
            
            xhr.onreadystatechange = () => {
                    
                if(xhr.readyState == 4) {
                    
                    if(xhr.status == 200) {   
                        
                        resolve(xhr.responseText);  
                    } else {
                        
                        reject(xhr.responseText);
                    }
                }
            };
            
            xhr.send();
             
            
        });
    }
}