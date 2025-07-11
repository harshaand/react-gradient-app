import React from 'react'

function App() {
  const refSlider = React.useRef(null)
  const [noOfCells, setNoOfCells] = React.useState(2)
  const [selectedCellRed, setSelectedCellRed] = React.useState('[2,2]')
  const [selectedCellBlue, setSelectedCellBlue] = React.useState(null)
  const [coordinatesToGridRatioRed, setCoordinatesToGridRatioRed] = React.useState([1, 1])
  const [coordinatesToGridRatioBlue, setCoordinatesToGridRatioBlue] = React.useState([1, 1])

  function sliderOnChange(e) {
    const newNoOfCells = e.target.value
    setSelectedCellRed(`[${Math.round(coordinatesToGridRatioRed[0] * newNoOfCells)}, ${Math.round(coordinatesToGridRatioRed[1] * newNoOfCells)}]`)
    if (selectedCellBlue) {
      setSelectedCellBlue(`[${Math.round(coordinatesToGridRatioBlue[0] * newNoOfCells)}, ${Math.round(coordinatesToGridRatioBlue[1] * newNoOfCells)}]`)
    }
    setNoOfCells(newNoOfCells)
  }

  let cells = []

  for (let y = 1; y <= noOfCells; y++) {
    for (let x = 1; x <= noOfCells; x++) {
      const coords = [x, y]
      const xDiffRed = Math.abs(JSON.parse(selectedCellRed)[0] - coords[0]);
      const yDiffRed = Math.abs(JSON.parse(selectedCellRed)[1] - coords[1]);
      const highestDiffRed = Math.max(xDiffRed, yDiffRed);
      const redOpacity = 1 - (highestDiffRed / (noOfCells - 1))


      let xDiffBlue
      let yDiffBlue
      if (selectedCellBlue) {
        xDiffBlue = Math.abs(JSON.parse(selectedCellBlue)[0] - coords[0]);
        yDiffBlue = Math.abs(JSON.parse(selectedCellBlue)[1] - coords[1]);
      }

      const highestDiffBlue = Math.max(xDiffBlue, yDiffBlue);
      const blueOpacity = 1 - (highestDiffBlue / (noOfCells - 1))


      cells.push(
        <div key={`[${x},${y}]`} className="container-cells">
          {selectedCellBlue &&
            <div
              key={`[${x},${y}]_blue`} className="cell"
              style={{
                backgroundColor: 'blue',
                opacity: `${blueOpacity}`
              }}
            />
          }

          <div
            key={`[${x},${y}]_red`} className="cell"
            style={{
              backgroundColor: 'red',
              opacity: `${redOpacity}`,
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setSelectedCellBlue(`[${x},${y}]`);
              setCoordinatesToGridRatioBlue([x / noOfCells, y / noOfCells])
            }}
            onClick={() => {
              setSelectedCellRed(`[${x},${y}]`)
              setCoordinatesToGridRatioRed([x / noOfCells, y / noOfCells])
            }}
          />
        </div>)

    }
  }

  const gridStyles = {
    gridTemplateRows: `repeat(${noOfCells}, 1fr)`,
    gridTemplateColumns: `repeat(${noOfCells}, 1fr)`,
  }

  return (
    <>
      <main>
        <div className='grid' style={gridStyles}>
          {cells}
        </div>
        <div className='container-slider'>
          <input ref={refSlider} className="slider" type="range" min="2" max="100" defaultValue="2" onChange={sliderOnChange} />
          <div className='slider-value'>
            {refSlider.current !== null ? refSlider.current.value : '2'}
          </div>
        </div>
      </main>
    </>
  )
}

export default App