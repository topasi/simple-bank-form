const QrCode = ({ data, styles }) => {
	return <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${data}&size=250x250&margin=10`} alt={data} style={styles} />
}

export default QrCode
