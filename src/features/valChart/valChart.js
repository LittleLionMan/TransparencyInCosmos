import React, { useCallback, useState } from "react";
import { PieChart, Pie, Sector } from 'recharts';
import "./valChart.css";


export function ValChart({aVals, bToken, loading}) {
  let valsCopy = JSON.parse(JSON.stringify(aVals));
  if (!loading) {
    valsCopy.forEach(element => {
      element.tokens = parseInt(element.tokens);
    });
  }
  
  const valSorting = (start, end) => {
    const arr = [];
    let tokens = 0;
    if (start > 0) {
      arr.push("...");
    }
    aVals.forEach(element => {
      if (start <= tokens && end >= tokens) {
        arr.push(element.description.moniker);
      }
      tokens += Math.round(element.tokens/1000000)/bToken
    });
    return arr
  }

  const data = [
    { name: "Nakamoto", value: 33.3, total: 33.3, color: "red", vals: valSorting(0, 0.333) },
    { name: "Voting Majority", value: 16.7, total: 50, color: "orange", vals: valSorting(0.333, 0.5) },
    { name: "Chain Control", value: 16.6, total: 66.6, color: "yellow", vals: valSorting(0.5, 0.666) },
    { name: "Rest", value: 33.4, total: 100, color: "green", vals: valSorting(0.666, 1) }
  ];
  
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={payload.color}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={90}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={payload.color}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`Total Stake ${payload.total}%`}
          </text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`${payload.vals[0] !== "..." ? payload.vals.length : payload.vals.length - 1} (Rate ${(percent * 100).toFixed(2)}%)`}
          </text>
          <foreignObject 
            width={150} 
            height={250}
            x={ex + (cos >= 0 ? 1 : -14) * 12}
            y={ey+25}
            overflow="auto"
          >
            <ul>
              {
              payload.vals.map((element, index) => {
                return (
                  <li key={index}>
                    {element}
                  </li>
                )
                
              })
              
            }
            </ul>
        </foreignObject>
        
      </g>
    );
  };

  const renderActiveShape1 = (props) => {
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      payload,
    } = props;

    data.forEach((element, index) => {
      if (element.vals.includes(payload.description.moniker)) {
        switch(index) {
          case 0:
            setActiveIndex(0);
            break;
            case 1:
              setActiveIndex(1);
              break;
              case 2:
                setActiveIndex(2);
                break;
              case 3:
                setActiveIndex(3);
                break;
          default:
            setActiveIndex(4);
        }
      }
    })

    return (
      <g>
        <text x={cx} y={cy} dy={-260} textAnchor="middle" fill={"black"}>
          {payload.description.moniker} ({Math.round(payload.tokens/bToken/100)/100}%)
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"blue"}
        />
      </g>
    )  
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const [activeIndex1, setActiveIndex1] = useState(-1);
  const onPieEnter1 = useCallback(
    (_, index) => {
      setActiveIndex1(index);
    },
    [setActiveIndex1]
  );

  return (
    <PieChart width={1200} height={850}>
      <Pie 
        activeIndex={activeIndex1}
        activeShape={renderActiveShape1}
        data={valsCopy}
        cx={600}
        cy={300}
        startAngle={90}
        endAngle={450}
        innerRadius={90}
        outerRadius={199}
        fill="grey"
        dataKey="tokens"
        onMouseOver={onPieEnter1}
      />
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={600}
        cy={300}
        startAngle={90}
        endAngle={450}
        innerRadius={200}
        outerRadius={240}
        fill="black"
        dataKey="value"
        onMouseOver={onPieEnter}
      />
    </PieChart>
  );
}
