import React from "react";
import {
	AreaChart,
	Area,
	XAxis,
	ResponsiveContainer,
	YAxis,
	Tooltip,
	Label,
	Legend,
} from "recharts";
import styles from "./LineGraph.module.css";

export default function LineGraph({ chartData, chartType, generalData }) {
	// Preset chart fill colors
	const fillColors = ["#66b3a1", "#8266b3", "#c26193", "#c9b667"];

	const renderGeneralCharts = () => {
		// Finding the active data
		const activeGeneralData = generalData.filter((name) => {
			return chartData.findIndex((exercise) => exercise.type === name) !== -1;
		});

		return activeGeneralData.slice(0, 4).map((menuItem, index) => {
			return (
				<div key={index} className={styles.chart_container}>
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart
							data={chartData.filter((workout) => workout.type === menuItem)}
						>
							<XAxis dataKey="date" />
							<YAxis />
							<Tooltip />
							<Area
								type="monotone"
								dataKey="calBurned"
								fill={fillColors[index]}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			);
		});
	};

	const renderNutritionCharts = () => {
		return (
			<div className={styles.chart_container_big}>
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={chartData}>
						<XAxis dataKey="date" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Area
							type="monotone"
							dataKey="calories"
							stroke={fillColors[0]}
							fill={fillColors[0]}
							stackId="3"
						/>
						<Area
							type="monotone"
							dataKey="protein"
							stroke={fillColors[1]}
							fill={fillColors[1]}
							stackId={2}
						/>
						<Area
							type="monotone"
							dataKey="carbs"
							stroke={fillColors[2]}
							fill={fillColors[2]}
							stackId={2}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		);
	};

	const renderCharts = () => {
		switch (chartType) {
			case "climb":
				<div className={styles.chart_container}>
					<ResponsiveContainer width="100%" height={300}>
						<AreaChart
							data={chartData.filter((workout) => workout.type === "climb")}
						></AreaChart>
					</ResponsiveContainer>
				</div>;
				break;

			default:
				undefined;
		}
	};

	return chartType === "general"
		? renderGeneralCharts()
		: chartType === "nutrition"
			? renderNutritionCharts()
			: undefined;
}
