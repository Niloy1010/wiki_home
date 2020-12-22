package main

import (
	"net/http"
	"encoding/json"
	"sync"
	"strings"
	"errors"
	"io/ioutil"
)
//Articles is an array of Article type
type Articles []Article

type articleHandler struct{
	sync.Mutex
	articles Articles
}
//Article is the name and content of wiki
type Article struct{
	Name string `json:"name"`
	Content string `json:"content"`
}

//Extracts name from URL when a request comes
func nameFromURL(r string) (string, error) {
	parts := strings.Split(r, "/")

	if len(parts) !=3 {
		return "", errors.New("Not Found")
	}
	if len(parts[len(parts)-1]) <=0 {
		return "", errors.New("Not Found")
	}
	name:= string(parts[len(parts)-1])
	return name, nil
}

//Throws Error
func respondWithError(w http.ResponseWriter, code int, msg string) {
	
	respondWithJSON(w, code, map[string]string{"error":msg})
}

//Responds the Get Command
func respondWithJSON(w http.ResponseWriter, code int, data interface{}) {
	response := data
	w.Header().Add("Content-Type", "application/json")
	
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(response)

}

//Reponses to Get single article 
func respondText(w http.ResponseWriter, code int, data string) {
	newData := []byte(data)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Content-Type", "text/html")
	w.WriteHeader(code)
	w.Write(newData)
}


func createdOrUpdated(w http.ResponseWriter,code int) {
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.WriteHeader(code)
}

//Check incoming request
func (ar *articleHandler) ServeHTTP(w http.ResponseWriter, r *http.Request){
	
	w.Header().Set("Access-Control-Allow-Origin","*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	switch r.Method{
	case "GET" :
		ar.get(w,r)
	case "PUT","OPTIONS" :
		ar.put(w,r)	
	default:
		respondWithError(w, http.StatusMethodNotAllowed, "invalid Method")
	}
}

//Handles Put Request
func (ar *articleHandler) put(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	name, err := nameFromURL(r.URL.String())
	if err !=nil{
		respondWithError(w, http.StatusNotFound, err.Error())
		return
	}
	body, err := ioutil.ReadAll(r.Body)
	if err!= nil{
		respondWithError(w, http.StatusInternalServerError, err.Error())
		return 
	}
	defer ar.Unlock()
	ar.Lock()
	var position int = -999999
	for index,art :=range ar.articles{
		if(art.Name == name) {
			position = index	
		}
	}
	if !(position <0) {
		
		ar.articles[position].Content = string(body) 
		createdOrUpdated(w,http.StatusOK)
	} else{
	article:= Article{Name:name,Content:string(body)}
	ar.articles = append(ar.articles,article)
	createdOrUpdated(w,http.StatusCreated)
	}
}


//Handles Get Request
func (ar *articleHandler) get(w http.ResponseWriter, r *http.Request) {
	defer ar.Unlock()
	ar.Lock()
	name, err := nameFromURL(r.URL.String())
	if err!= nil {
	respondWithJSON(w, http.StatusOK, ar.articles)
	} else{ 
	for _,art :=range ar.articles{
		if strings.ToLower(art.Name) == strings.ToLower(name){
			respondText(w, http.StatusOK, art.Content)
			return
		}
	}
	respondWithError(w, http.StatusNotFound, "Not Found")
}
}

//An Initial Article Created
func newArticleHandler() *articleHandler {
	return &articleHandler{
		articles: Articles{
			Article{"rest_api","This is a content that gets created when server starts"},
		},
	}
}
func main() {
	port := ":9090"
	ar := newArticleHandler();
	http.Handle("/articles" ,ar)
	http.Handle("/articles/" ,ar)
    http.ListenAndServe(port, nil)
}


