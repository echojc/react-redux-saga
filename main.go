package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"
)

var todos = []Item{
	{"1", "bootstrap a single page app", true},
	{"2", "learn about react", false},
	{"3", "encroach upon redux territory", false},
	{"4", "tell of epics and sagas", false},
}

type Item struct {
	ID    string `json:"id"`
	Label string `json:"label"`
	Done  bool   `json:"done"`
}

func main() {
	rand.Seed(time.Now().UnixNano())

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		wait()
		sendState(w, todos)
	})

	http.HandleFunc("/add", func(w http.ResponseWriter, r *http.Request) {
		wait()
		label := readBody(r)
		todos = append(todos, Item{
			ID:    strconv.Itoa(rand.Int()),
			Label: label,
			Done:  false,
		})
		sendState(w, todos)
	})

	http.HandleFunc("/delete", func(w http.ResponseWriter, r *http.Request) {
		wait()
		id := readBody(r)
		j := 0
		for i := range todos {
			todos[j] = todos[i]
			if todos[i].ID != id {
				j++
			}
		}
		todos = todos[:j]
		sendState(w, todos)
	})

	http.HandleFunc("/toggle", func(w http.ResponseWriter, r *http.Request) {
		wait()
		id := readBody(r)
		for i := range todos {
			if todos[i].ID == id {
				todos[i].Done = !todos[i].Done
			}
		}
		sendState(w, todos)
	})

	log.Fatal(http.ListenAndServe(":8899", nil))
}

func wait() {
	<-time.After(time.Second)
}

func readBody(r *http.Request) string {
	bs, _ := ioutil.ReadAll(r.Body)
	return strings.TrimSpace(string(bs))
}

func sendState(w http.ResponseWriter, items []Item) {
	bs, _ := json.Marshal(items)
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Write(bs)
}
