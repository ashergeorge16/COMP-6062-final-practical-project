/// Create a new Vue app
const app = Vue.createApp({
    /// Define the data for the app
    data() {
        return {
            myFullName : 'Asher George',
            studentID: '1197563',
            userName : '',
            Age: '',
            userPic:'',
            city: 'London',
            province: 'Ontario',
            country: 'Canada',
            weatherResult: [],
            word: '',
            phonetic:'',
            definition:'',
            inputWord:'' 

        };
    },
    /// Define the methods for the app
    methods: {
        fetchUser() {
            fetch(`http://comp6062.liamstewart.ca/random-user-profile`)
            .then(response => response.json())
            .then(data => {
                this.userName = data.first_name + ' ' + data.last_name;
                this.Age = data.age;
                this.userPic = data.profile_picture;
            });
        },
        fetchWeather() {
            fetch(`http://comp6062.liamstewart.ca/weather-information?city=${this.city}&province=${this.province}&country=${this.country}`)
            .then(response => response.json())
            .then(data => {
                this.weatherResult = data;
            });
        },
        fetchDefinition(){
            fetch(`https://comp6062.liamstewart.ca/define?word=${this.inputWord}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) { // checks data is array and not empty
                    const firstResult = data[0]; // Use the first definition in the array
                    this.word = firstResult.word;
                    this.phonetic = firstResult.phonetic || 'None';
                    this.definition = firstResult.definition || 'No definition found.';
                }
                else{                               //else word cant be found
                    this.word = 'Word not found';
                    this.phonetic = '';
                    this.definition = '';
                }
            });
        }
    },
    mounted(){
        this.fetchUser(); //Automatically fetch user profile when page loads
        this.fetchWeather(); //Automatically fetch weather when page loads    
    }
});

/// Mount the app to the #app element
app.mount('#app');