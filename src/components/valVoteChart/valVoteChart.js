import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
const COLORS = ['#00ff00', '#ff0000', '#800080', '#000000', '#D5D5D5'];

export function ValVoteChart(props) {

    return (
      <ResponsiveContainer width="100%" height="55%">
        <PieChart>
            <Pie
            data={props.data}
            cx={200}
            cy={150}
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            fill='#D5D5D5'
            paddingAngle={5}
            dataKey="votes"
            label
            >
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
      </PieChart>
      </ResponsiveContainer>
    );
  }

