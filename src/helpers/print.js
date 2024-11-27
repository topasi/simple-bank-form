import { jsPDF } from 'jspdf'

const print = ({ name = '', data = [] }) => {
	const pdf = new jsPDF('p', 'mm', 'a4')

	const dpi = 96
	const margin = 30
	const pageWidth = pdf.internal.pageSize.getWidth() - margin
	const x = margin / 2
	const y = margin / 2

	data.forEach((d, i) => {
		const widthInMm = (d.width / dpi) * 25.4
		const heightInMm = (d.height / dpi) * 25.4
		const scalingFactor = pageWidth / widthInMm
		const width = widthInMm * scalingFactor
		const height = heightInMm * scalingFactor
		if (i === 0) {
			pdf.addImage(d.src, 'PNG', x, y, width, height)
		} else {
			pdf.addPage()
			pdf.addImage(d.src, 'PNG', x, y, width, height)
		}
	})

	pdf.save(name)

	// const url = data.replace('data:application/pdf;filename=generated.pdf;', 'data:image/png;')

	// const iframe = document.createElement('iframe')

	// iframe.style.display = 'none'

	// document.body.appendChild(iframe)

	// const iframeDoc = iframe.contentDocument || iframe.contentWindow.document

	// const img = new Image()

	// img.onload = () => {
	// 	const newImg = iframeDoc.createElement('img')

	// 	newImg.src = url
	// 	newImg.style.display = 'table'
	// 	newImg.style.margin = '0 auto'

	// 	if (img.width > 900) {
	// 		newImg.style.width = '100%'
	// 	}

	// 	iframeDoc.body.appendChild(newImg)

	// 	iframe.contentWindow.print()

	// 	setTimeout(() => {
	// 		document.body.removeChild(iframe)
	// 	}, 100)
	// }

	// img.src = url
}

export default print
