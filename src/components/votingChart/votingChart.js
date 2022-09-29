import { PieChart, Pie } from 'recharts';
import "./votingChart.css";


export function VotingChart(props) {
    
    
    let renderLabel = function(entry) {
        return entry.name;
    }


    return (
            <PieChart width={200} height={120}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={props.data}
                    cx="50%"
                    cy="100%"
                    outerRadius={80}
                    fill="#fff"
                    label={renderLabel}
                    nameKey="name"
                />
            </PieChart>
        
    );
  
}