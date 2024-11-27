import Barcode from 'react-barcode'

const BarCode = ({ data }) => {
	return (
		<div
			style={{
				width: '100%',
				marginTop: 10,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: 'white',
				overflow: 'hidden',
			}}
		>
			<Barcode value={data} displayValue={false} width={1} height={18} marginTop={4} marginBottom={4} marginLeft={1} marginRight={1} />
		</div>
	)
}

export default BarCode
