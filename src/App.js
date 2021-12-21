import React,{useState,useEffect} from 'react'
import "./App.css"
const App = () => {
    let now=Date.now();
    let nowe=Date(now*1000).toString();
    const [moodIcon,setMoodIcon]=useState("");
    const [bufferValue,setBufferValue]=useState("");
    const [searchValue,setSearchValue]=useState("Tirupur");
    const [fullData,setFullData]=useState("");
    const getWeatherInfo=async()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=35e6caef456427a8e412a152017554e4`;
            const res=await fetch(url);
            const data=await res.json();
            console.log(data);
            const {temp,humidity,pressure}=data.main;
            const {main:weatherMood}=data.weather[0];
            const {name}=data;
            const {speed}=data.wind;
            const {country,sunset}=data.sys;
            console.log(sunset);
            const fine=new Date(sunset*1000)+"";
            console.log(fine);
            const dateArray=fine.split(" ");
            const Tsunset=dateArray[4];
            const weatherInfo={temp,humidity,pressure,weatherMood,name,speed,country,Tsunset};
            setFullData(weatherInfo);
        }
        catch(error){
            console.log(error);
        }

    };
    useEffect(() => {
        if(fullData.weatherMood){
            console.log(moodIcon);
            switch (fullData.weatherMood) {
                case "Clouds":
                    {setMoodIcon("wi-day-cloudy");
                    break;}
                case "Haze":
                    {setMoodIcon("wi-fog");
                    break;}
                case "Clear":
                    {setMoodIcon("wi-day-sunny");
                    break;}
                default:
                    {setMoodIcon("wi-day-sunny");
                    break;}
            }
            }
    },[moodIcon,fullData]);
    useEffect(() => {
        getWeatherInfo();
    },[searchValue])
    useEffect(() => {
        now=Date.now();
        nowe=Date(now*1000).toString();
    })
    return (
        <>
        <div className="form">
        <input type="text" id="input" placeholder="Search" onChange={(event)=>{setBufferValue(event.target.value)}}/> <button onClick={()=>{setSearchValue(bufferValue);getWeatherInfo();}}>Submit</button>
        </div>
        <div className="main">
            <div className='weatherIcon center'>
            <i className={`wi ${moodIcon}`}></i>    
            </div>
            <div className='weatherInfo'>
            <div className="percent center">{fullData.temp}&deg;C</div>
            <div className="details center"><h3>{fullData.weatherMood}</h3><br/>{fullData.name},{fullData.country}</div>
            <div className="dateTime center">{nowe}</div>
            </div>
            <div className='weatherDesc'>
            <div className='block'>
                <p><i className="wi wi-sunset"></i></p>
            <p>
            Sunset<br/><br/>{fullData.Tsunset} <code>PM</code>    
            </p>
            </div>
            <div className='block'>
                <p><i className="wi wi-humidity"></i></p>
            <p>
            Humidity<br/><br/>{fullData.humidity}%  
            </p>
            </div>
            <div className='block'>
                <p><i className="wi wi-rain-wind"></i></p>
            <p>
            Pressure<br/><br/>{fullData.pressure} Pa    
            </p>
            </div>
            <div className='block'>
                <p><i className="wi wi-strong-wind"></i></p>
            <p>
            Speed<br/><br/>{fullData.speed} Kmph    
            </p>
            </div>
            </div>

        </div>
        </>
    )
}

export default App
