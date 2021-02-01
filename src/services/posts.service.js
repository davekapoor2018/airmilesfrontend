import http from "../http-common";

class PostsDataService {
    getAll() {
      return http.get("/posts");
    }

    create(data) {
      return http.post("/posts", data);
    }

    createreply(data) {
     // alert(data.postreplyPostID);
      return http.post("/posts/reply", data);
    }

    getweather(city){
      return http.get("api.openweathermap.org/data/2.5/weather?q=Salisbury&appid=9865dfdfbcb37f82e72515e8eb2d13e8")
    }

}

export default new PostsDataService();