// import React, {useEffect, useState} from 'react';
// import ReactApexChart from 'react-apexcharts';
// import {Button} from "@/components/ui/button.jsx";
// import {useDispatch, useSelector} from "react-redux";
// import {fetchMarketChart} from "@/redux/slices/coins/coinSlice.js";
// import PropTypes from "prop-types"; // Correct import for ReactApexChart
//
// const timeSeries = [
//     {
//         keyword: "DIGITAL_CURRENCY_DAILY",
//         key: "Time Series (Daily)",
//         lable: "1 Day",
//         value: 1
//     },
//     {
//         keyword: "DIGITAL_CURRENCY_WEEKLY",
//         key: "Weekly Time Series ",
//         lable: "1 Week",
//         value: 7
//     },
//     {
//         keyword: "DIGITAL_CURRENCY_MONTHLY",
//         key: "Monthly Time Series ",
//         lable: "1 Month",
//         value: 30
//     },
//     {
//         keyword: "DIGITAL_CURRENCY_YEARLY",
//         key: "Yearly Time Series ",
//         lable: "1 year",
//         value: 365
//     },
//
// ]
//
// const StockChart = ({coinId}) => {
//
//     // const [activeLable, setActiveLable] = useState("1 Day")
//     const [activeLable, setActiveLable] = useState(timeSeries[0])
//     const dispatch = useDispatch();
//     const {coins} = useSelector((state) => state.coin);
//     // console.log("conis is the:" + coins);
//
//     // const series = [{
//     //     name: 'Stock Price',
//     //     data: [
//     //         [1717603400959, 71587.3390476925], [1717606895639, 71331.28620844566],
//     //         [1717610731513, 71713.94076998901], [1717614336731, 71118.28092102184],
//     //         [1717618088849, 71197.62590248944], [1717621274314, 71218.07366859974],
//     //         [1717625081193, 71144.3179387504], [1717628642902, 71162.3800160821],
//     //         [1717632233257, 71054.14439841534], [1717635893199, 70990.2501658845],
//     //         [1717639668382, 71111.7771693848], [1717643030407, 71163.70801347587],
//     //         [1717646656264, 71053.80230635182], [1717650437632, 71066.23543064836],
//     //         [1717653685905, 70921.91695573041], [1717657666905, 70891.01993148876],
//     //         [1717661281134, 70989.56581977903], [1717664677685, 70907.02219682894],
//     //         [1717668378983, 70952.67189764655], [1717671605008, 70958.65300241375],
//     //         [1717675366480, 71085.53126834088], [1717678871300, 71173.32805060249],
//     //         [1717682542265, 71207.59435524222], [1717686256069, 71469.15438887932],
//     //         [1717689747994, 71238.06260323075], [1717693661147, 70768.22344988026],
//     //         [1717697252687, 71138.39580214774], [1717700455370, 71069.18929010618],
//     //         [1717704143125, 70429.80683094825], [1717708128901, 70730.16396597322],
//     //         [1717711488493, 70704.28903677444], [1717714915691, 70897.66575927468],
//     //         [1717718707718, 70773.74598776827], [1717722189961, 70858.3516640106],
//     //         [1717725615895, 70863.98433867987], [1717729586837, 70823.64754475745],
//     //         [1717733286794, 71094.45975791331], [1717736756323, 71218.7556793813],
//     //         [1717740060173, 71336.03392792157], [1717743625867, 71280.68092471165],
//     //         [1717747365784, 71095.85098124442], [1717750857712, 71080.68182932476],
//     //         [1717754787461, 71273.51614831026], [1717758204938, 71327.90048172572],
//     //         [1717761906293, 71643.88933000261]
//     //     ]
//     // }];
//     console.log("Coins in chart data: ", coins);
//     const series = [{
//         name: 'Stock Price',
//         data: coins?.marketChart?.chartData || [],
//     }];
//     console.log(coins?.marketChart?.chartData);
//     useEffect(() => {
//         if (coinId) {
//             const jwt = localStorage.getItem('jwt');
//             dispatch(fetchMarketChart({ coinId, days: activeLable.value }, jwt));
//         }
//     }, [dispatch, coinId, activeLable]);
//     // useEffect(() => {
//     //     console.log("Market Chart Data:", coins?.marketChart?.chartData);
//     // }, [coins?.marketChart?.chartData]);
//
//     const options = {
//         chart: {
//             id: "area-datetime",
//             type: "area",
//             height: 550,
//             zoom: {
//                 autoScaleYaxis: true
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         xaxis: {
//             type: "datetime",
//             tickAmount: 6,
//         },
//         colors: ["#758AA2"],
//         markers: {
//             colors: ["#fff"],
//             strokeColors: "#fff",
//             size: 0,
//             strokeWidth: 1,
//             style: "hollow"
//         },
//         tooltip: {
//             theme: "dark",
//         },
//         fill: {
//             type: "gradient",
//             gradient: {
//                 shadeIntensity: 1,
//                 opacityFrom: 0.7,
//                 opacityTo: 0.9,
//                 stops: [0, 100]
//             }
//         },
//         grid: {
//             borderColor: "#47535E",
//             strokeDasharray: 4,
//             show: true
//         }
//     };
//
//     const handleActiveLable = (value) => {
//         setActiveLable(value)
//     }
//     return (
//
//
//         <div>
//             <div className={'npt-2 npl-2 nspace-x-3'}>
//                 {timeSeries.map((item) => <Button variant={activeLable.lable === item.lable ? "" : "outline"}
//                                                   onClick={() => handleActiveLable(item)} key={item.lable}>
//                     {item.lable}
//                 </Button>)}
//             </div>
//             <div id="chart-timelines">
//                 <ReactApexChart options={options} series={series} type="area" height={450}/>
//             </div>
//         </div>
//     );
// };
//
// export default StockChart;
// StockChart.propTypes = {
//     coinId: PropTypes.string.isRequired,
// };
//
// //
// // import React, {useState} from 'react';
// // import ReactApexChart from 'react-apexcharts';
// // import {Button} from "@/components/ui/button.jsx";
// //
// // const timeSeries = [
// //     {
// //         keyword: "DIGITAL_CURRENCY_DAILY",
// //         key: "Time Series (Daily)",
// //         label: "1 Day",
// //         value: 1
// //     },
// //     {
// //         keyword: "DIGITAL_CURRENCY_WEEKLY",
// //         key: "Weekly Series ",
// //         label: "1 Week",
// //         value: 7
// //     },
// //     {
// //         keyword: "DIGITAL_CURRENCY_MONTHLY",
// //         key: "Monthly Series ",
// //         label: "1 Month",
// //         value: 30
// //     },
// // ];
//
// // const StockChart = () => {
// //     const [activeLabel, setActiveLabel] = useState("1 Day");
// //
// //     const series = [{
// //         name: 'Stock Price',
// //         data: [
// //             [1717603400959, 71587.3390476925], [1717606895639, 71331.28620844566],
// //             [1717610731513, 71713.94076998901], [1717614336731, 71118.28092102184],
// //             [1717618088849, 71197.62590248944], [1717621274314, 71218.07366859974],
// //             [1717625081193, 71144.3179387504], [1717628642902, 71162.3800160821],
// //             [1717632233257, 71054.14439841534], [1717635893199, 70990.2501658845],
// //             [1717639668382, 71111.7771693848], [1717643030407, 71163.70801347587],
// //             [1717646656264, 71053.80230635182], [1717650437632, 71066.23543064836],
// //             [1717653685905, 70921.91695573041], [1717657666905, 70891.01993148876],
// //             [1717661281134, 70989.56581977903], [1717664677685, 70907.02219682894],
// //             [1717668378983, 70952.67189764655], [1717671605008, 70958.65300241375],
// //             [1717675366480, 71085.53126834088], [1717678871300, 71173.32805060249],
// //             [1717682542265, 71207.59435524222], [1717686256069, 71469.15438887932],
// //             [1717689747994, 71238.06260323075], [1717693661147, 70768.22344988026],
// //             [1717697252687, 71138.39580214774], [1717700455370, 71069.18929010618],
// //             [1717704143125, 70429.80683094825], [1717708128901, 70730.16396597322],
// //             [1717711488493, 70704.28903677444], [1717714915691, 70897.66575927468],
// //             [1717718707718, 70773.74598776827], [1717722189961, 70858.3516640106],
// //             [1717725615895, 70863.98433867987], [1717729586837, 70823.64754475745],
// //             [1717733286794, 71094.45975791331], [1717736756323, 71218.7556793813],
// //             [1717740060173, 71336.03392792157], [1717743625867, 71200.89296219886],
// //             [1717747441774, 71195.95703964958],
// //             [1717754511866, 71066.74357615047], [1717758121518, 71096.16713657463],
// //             [1717761715568, 71066.20488967089], [1717765254052, 71126.7678653854],
// //             [1717768909258, 71063.3121667694],
// //             [1717776039650, 71073.2173878362], [1717779649243, 70985.5712114747],
// //             [1717786964084, 71002.30627320091],
// //             [1717790416251, 71056.55303232762], [1717794064826, 71158.27714964491],
// //             [1717797679795, 71158.27714964491], [1717801220524, 71011.20254060019]
// //         ]
// //     }];
// //
// //     const options = {
// //         chart: {
// //             type: 'area',
// //             height: 350,
// //             zoom: {
// //                 enabled: false
// //             }
// //         },
// //         dataLabels: {
// //             enabled: false
// //         },
// //         stroke: {
// //             curve: 'smooth'
// //         },
// //         xaxis: {
// //             type: 'datetime',
// //             labels: {
// //                 datetimeUTC: false,
// //                 style: {
// //                     colors: ['#9aa0ac'],
// //                 },
// //                 format: 'MMM dd',
// //             },
// //         },
// //         yaxis: {
// //             labels: {
// //                 style: {
// //                     colors: ['#9aa0ac'],
// //                 },
// //             },
// //         },
// //         tooltip: {
// //             x: {
// //                 format: 'dd MMM yyyy HH:mm'
// //             },
// //         },
// //         fill: {
// //             type: 'gradient',
// //             gradient: {
// //                 shadeIntensity: 1,
// //                 inverseColors: false,
// //                 opacityFrom: 0.5,
// //                 opacityTo: 0,
// //                 stops: [0, 90, 100]
// //             }
// //         },
// //         colors: ['#FF1654', '#247BA0'],
// //         grid: {
// //             borderColor: '#9aa0ac',
// //         }
// //     };
// //
// //     return (
// //         <div>
// //             <div className={'flex gap-2 mb-4'}>
// //                 {timeSeries.map((item, index) =>
// //                     <Button
// //                         className={'rounded-full'}
// //                         key={index}
// //                         variant={activeLabel === item.label ? 'default' : 'outline'}
// //                         onClick={() => setActiveLabel(item.label)}
// //                     >{item.label}</Button>
// //                 )}
// //             </div>
// //             <ReactApexChart options={options} series={series} type="area" height={350}/>
// //         </div>
// //     );
// // };
// //
// // export default StockChart;






import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Button } from "@/components/ui/button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/redux/slices/coins/coinSlice.js";
import PropTypes from "prop-types";

const timeSeries = [
    {
        keyword: "DIGITAL_CURRENCY_DAILY",
        key: "Time Series (Daily)",
        label: "1 Day",
        value: 1
    },
    {
        keyword: "DIGITAL_CURRENCY_WEEKLY",
        key: "Weekly Time Series",
        label: "1 Week",
        value: 7
    },
    {
        keyword: "DIGITAL_CURRENCY_MONTHLY",
        key: "Monthly Time Series",
        label: "1 Month",
        value: 30
    },
    {
        keyword: "DIGITAL_CURRENCY_YEARLY",
        key: "Yearly Time Series",
        label: "1 Year",
        value: 365
    },
];

const StockChart = ({ coinId }) => {
    const [activeLabel, setActiveLabel] = useState(timeSeries[0]);
    const dispatch = useDispatch();
    const { coins } = useSelector((state) => state.coin);
    const { chartData } = useSelector((state) => state.coin);

    // Log coin data for debugging
    console.log('Chart data in component:', chartData);

    // Ensure data structure is correct
    const series = [{
        name: 'Stock Price',
        data: chartData?.prices || [], // Ensure this is the correct field
    }];

    useEffect(() => {
        if (coinId) {
            const jwt = localStorage.getItem('jwt');
            dispatch(fetchMarketChart({ coinId, days: activeLabel.value }, jwt));
        }
    }, [dispatch, coinId, activeLabel]);

    console.log("Market Chart Data:", chartData?.prices); // Check the field for data

    const options = {
        chart: {
            id: "area-datetime",
            type: "area",
            height: 550,
            zoom: {
                autoScaleYaxis: true
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: "datetime",
            tickAmount: 6,
        },
        colors: ["#758AA2"],
        markers: {
            colors: ["#fff"],
            strokeColors: "#fff",
            size: 0,
            strokeWidth: 1,
            style: "hollow"
        },
        tooltip: {
            theme: "dark",
        },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
        grid: {
            borderColor: "#47535E",
            strokeDasharray: 4,
            show: true
        }
    };

    const handleActiveLabel = (value) => {
        setActiveLabel(value);
    };

    return (
        <div>
            <div className='npt-2 npl-2 nspace-x-3'>
                {timeSeries.map((item) => (
                    <Button
                        variant={activeLabel.label === item.label ? "" : "outline"}
                        onClick={() => handleActiveLabel(item)}
                        key={item.label}
                    >
                        {item.label}
                    </Button>
                ))}
            </div>
            <div id="chart-timelines">
                <ReactApexChart options={options} series={series} type="area" height={450} />
            </div>
        </div>
    );
};

StockChart.propTypes = {
    coinId: PropTypes.string.isRequired,
};

export default StockChart;
