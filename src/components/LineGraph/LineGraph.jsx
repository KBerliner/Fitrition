import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	ResponsiveContainer,
	YAxis,
	Tooltip,
} from "recharts";
import styles from "./LineGraph.module.css";

export default function LineGraph({ chartData, chartType }) {
	return (
		<div className={styles.chart_container}>
			{/* <h1>{chartType}</h1> */}
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={chartData}>
					<YAxis />
					<XAxis />
					<Tooltip />
					<Area
						type="monotone"
						dataKey="calBurned"
						stroke="#5ba896"
						fill="#66b3a1"
					/>
					<XAxis dataKey="totalLbs" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
