import React from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer, YAxis } from "recharts";
import styles from "./LineGraph.module.css";

export default function LineGraph({ chartData, chartType }) {
	console.log(chartData);

	return (
		<div className={styles.chart_container}>
			<h1>{chartType}</h1>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart width={500} height={500} data={chartData}>
					<Area
						type="monotone"
						dataKey="totalLbs"
						stroke="#5ba896"
						fill="#66b3a1"
					/>
					<Area
						type="monotone"
						stroke="#5ba89a"
						fill="#66b3aa"
						dataKey="totalReps"
					/>
					<XAxis dataKey="totalLbs" />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
