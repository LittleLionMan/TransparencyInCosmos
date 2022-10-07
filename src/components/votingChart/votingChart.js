import { PieChart, Pie, ResponsiveContainer } from 'recharts';

export function VotingChart(props) {
    
    
    let renderLabel = function(entry) {
        return entry.name;
    }


    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
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
        </ResponsiveContainer>
    );
  
}