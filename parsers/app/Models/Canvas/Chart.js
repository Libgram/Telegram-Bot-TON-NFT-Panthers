class Chart {


	static async generate(xy) {	
		try{

			const width = 500; //px
			const height = 200; //px
	

			const data = {
			  labels: xy.map(item => item[0]),
			  datasets: [
			    {
			     
			      data: xy.map(item => item[1]),
			  
			      fill: false,
			      cubicInterpolationMode: 'monotone',
			      tension: 0.4,
			         borderColor: "#fff",
			    }
			  ]
			};

		const plugin = {
		  id: 'custom_canvas_background_color',
		  beforeDraw: (chart) => {
		    const ctx = chart.ctx;
		        ctx.save();
		        ctx.fillStyle = '#08c';
		        ctx.fillRect(0, 0, width, height);  
		   
		        ctx.restore();
		  }
		};

		    const config = {
		  type: 'line',
		  plugins: [plugin],
		  data: data,
		  options: {
		  plugins: {
			legend: {
			        display: false
			    }
			},
			elements: {
				point:{
				    radius: 0
				}
			},

			scales: {
			  x: {
			    display: false,
			  },
			  y: {
			    display: false,
			  }
			}
		  },
		};
	    let image = await global.chartCanvas.renderToBuffer(config);
	    image = Buffer.from(image).toString('base64')
	    return image;
		} catch(e) {
			console.log(e);
		}
	}


}

module.exports = Chart;