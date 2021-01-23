import React, {useState, useEffect, useRef, button} from 'react'
import {Line} from 'react-chartjs-2'
import "./LineChartAuto.css"

function LineChartAuto() {

    const [dataValues, setDataValues] = useState([])
    const [labelValues, setLabelValues] = useState([])
    const price = useRef("No trading")
    const [buyPrice, setBuyPrice] = useState("-")
    const [sellPrice, setSellPrice] = useState("-")
    const [bought, setBought] = useState(false)
    const [sold, setSold] = useState(false)
    const [profit, setProfit] = useState("-")

    let x
    let y=[]
    let z=[]
    let j

    const maxPrice = 10 
    const dataPoints = 100


    const data = {
        labels: labelValues,

        datasets: [
            {
                label: "Stock price",
                data: dataValues
            }
        ]
 
    }

    //Initialise chart data
    useEffect(() => {



        y[0]=100
        z[0]= 1

        for(let i=1; i<dataPoints; i++) {
        x = (Math.random()-.5)*maxPrice
        y[i] = Math.round(y[i-1] + x)
        z[i]=i+1
        }
        setDataValues(y)
        setLabelValues(z)

        

    }, [])


    //Create ticker
    useEffect(() => {

        const interval = setInterval(() => {
          console.log('This will run every second!');

          x = (Math.random()-.5)*maxPrice
          j = dataValues[dataPoints-1]
          setDataValues([...dataValues.splice(1,dataPoints), j+x])

          price.current = (Math.floor((j+x)*maxPrice)/maxPrice)

        }, 1000);



        return () => clearInterval(interval);

      }, []);


    
    const buyStock = () => {
  
        if (!bought) {
            setBuyPrice(price.current);
            setBought(true);
        }


    }

    const sellStock = () => {
  
        if (!sold) {
            setSellPrice(price.current);
            setSold(true);
        }

    }

    const reset = () => {
        setBought(false)
        setSold(false)
        setBuyPrice("-")
        setSellPrice("-")
    }

    return (


        <div className="lineauto">




                <Line data={data} />

                <h2>Current Price : {price.current}</h2>

                <div className="actions">
                    <button className="btn buy" onClick={buyStock}>Buy</button> <br/>
                    <button className="btn sell" onClick={sellStock}>Sell</button><br/>
                    <button className="btn reset" onClick= {reset}>Reset</button><br/>
                </div>


                    <h2>Buy Price: {buyPrice}       Sell Price: {sellPrice} </h2>


                    <h1>Profit/Loss: {Math.floor(-(buyPrice - sellPrice)*maxPrice)/maxPrice} </h1>
 
        </div>
    )
}

export default LineChartAuto
