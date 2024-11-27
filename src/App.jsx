import { useMemo, useRef, useState, useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { PatternFormat, NumericFormat } from 'react-number-format'
import html2canvas from 'html2canvas'
import short from 'short-uuid'
import moment from 'moment-timezone'

import print from './helpers/print'
import ActivatingTransaction from './components/ActivatingTransaction'
import CardInformation from './components/CardInformation'
import AuthorizationStatus from './components/AuthorizationStatus'

const App = () => {
	const activatingTransactionRef = useRef(null)
	const cardInformationRef = useRef(null)
	const authorizationStatusRef = useRef(null)

	const initialValues = useMemo(
		() => ({
			issuingBank: '',
			cardHolderName: '',
			cardNumber: '',
			expirationDate: '',
			amount: '',
			referenceNumber: '',
			codeActivated: '',
			madeOn: '',
			protocol: '',
		}),
		[]
	)

	const validationSchema = yup.object().shape({
		issuingBank: yup.string().required('The issuing bank is required').max(50, 'The issuing bank is too long'),
		cardHolderName: yup
			.string()
			.required('The card holder name is required')
			.max(50, 'The card holder is too long')
			.test('space-placeholder', 'The card holder name is invalid', (value) => value && !value.includes('_')),
		cardNumber: yup
			.string()
			.required('The card number is required')
			.max(19, 'The card number is invalid')
			.test('space-placeholder', 'The card number is invalid', (value) => value && !value.includes('_')),
		expirationDate: yup
			.string()
			.required('The expiration date is required')
			.max(5, 'The expiration date is too long')
			.test('space-placeholder', 'The expiration date is invalid', (value) => value && !value.includes('_') && moment(value, 'MM/DD', true).isValid()),
		amount: yup.string().required('The amount is required').max(20, 'The amount is too long'),
		referenceNumber: yup.string().required('The reference number is required').max(30, 'The reference number is too long'),
		codeActivated: yup.string().required('The activation code is required').length(4, 'The activation code is invalid'),
		madeOn: yup
			.string()
			.required('The made on is invalid')
			.length(19, 'The made on is invalid')
			.test('space-placeholder', 'The activation code is invalid', (value) => value && !value.includes('_') && moment(value, 'YYYY/MM/DD HH:mm:ss', true).isValid()),
		protocol: yup.string().required('The protocol is required').max(10, 'The protocol is too long'),
	})

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values, { setSubmitting, resetForm }) => {
			console.log(values)
			const options = {
				logging: false,
				useCORS: true,
			}
			const activatingTransactionCanvas = await html2canvas(activatingTransactionRef.current, options)
			const cardInformationCanvas = await html2canvas(cardInformationRef.current, options)
			const authorizationStatusCanvas = await html2canvas(authorizationStatusRef.current, options)
			print({
				name: `${moment().format('X')}.pdf`,
				data: [
					{
						src: activatingTransactionCanvas.toDataURL(),
						width: activatingTransactionCanvas.width,
						height: activatingTransactionCanvas.height,
					},
					{
						src: cardInformationCanvas.toDataURL(),
						width: cardInformationCanvas.width,
						height: cardInformationCanvas.height,
					},
					{
						src: authorizationStatusCanvas.toDataURL(),
						width: authorizationStatusCanvas.width,
						height: authorizationStatusCanvas.height,
					},
				],
			})
			resetForm()
			setSubmitting(false)
		},
	})

	const [barCode, setBarCode] = useState('')
	const [authorizationCode, setAuthorizationCode] = useState('')

	useEffect(() => {
		setBarCode(short.uuid())
		setAuthorizationCode(short.generate().slice(0, 12))
	}, [])

	return (
		<div
			className='text-bg-success'
			style={{
				width: '100%',
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<form
				className='needs-validation'
				noValidate
				autoComplete='off'
				onSubmit={formik.handleSubmit}
				style={{
					width: '100%',
					maxWidth: 500,
					margin: 16,
					paddingTop: 24,
					paddingBottom: 16,
					paddingLeft: 16,
					paddingRight: 16,
					backgroundColor: 'white',
					borderRadius: 16,
				}}
			>
				<div className='mb-4'>
					<h3 className='text-success'>Receiver Information</h3>
				</div>
				<div className='mb-3'>
					<label htmlFor='issuingBank' className='form-label text-secondary'>
						Issuing Bank: *
					</label>
					<input
						type='text'
						id='issuingBank'
						className={`form-control ${formik.touched.issuingBank && formik.errors.issuingBank ? 'is-invalid' : ''}`}
						placeholder='BDO Unibank, Inc.'
						maxLength={50}
						autoCorrect='off'
						autoCapitalize='none'
						disabled={formik.isSubmitting}
						value={formik.values.issuingBank}
						onChange={formik.handleChange}
						style={{
							height: 48,
						}}
					/>
					{formik.touched.issuingBank && formik.errors.issuingBank && <div className='invalid-feedback'>{formik.errors.issuingBank}</div>}
				</div>
				<div className='mb-3'>
					<label htmlFor='cardHolderName' className='form-label text-secondary'>
						Card Holder Name: *
					</label>
					<input
						type='text'
						id='cardHolderName'
						className={`form-control ${formik.touched.cardHolderName && formik.errors.cardHolderName ? 'is-invalid' : ''}`}
						placeholder='Juan Dela Cruz'
						maxLength={50}
						autoCorrect='off'
						autoCapitalize='none'
						disabled={formik.isSubmitting}
						value={formik.values.cardHolderName}
						onChange={formik.handleChange}
						style={{
							height: 48,
						}}
					/>
					{formik.touched.cardHolderName && formik.errors.cardHolderName && <div className='invalid-feedback'>{formik.errors.cardHolderName}</div>}
				</div>
				<div className='mb-3'>
					<label htmlFor='cardNumber' className='form-label text-secondary'>
						Card Number: *
					</label>
					<PatternFormat
						type='text'
						id='cardNumber'
						className={`form-control ${formik.touched.cardNumber && formik.errors.cardNumber ? 'is-invalid' : ''}`}
						placeholder='XXXX XXXX XXXX XXXX'
						format='#### #### #### ####'
						mask={'_'}
						disabled={formik.isSubmitting}
						value={formik.values.cardNumber}
						onValueChange={(values) => {
							const { formattedValue } = values
							formik.setFieldValue('cardNumber', formattedValue)
						}}
						style={{
							height: 48,
						}}
					/>
					{formik.touched.cardNumber && formik.errors.cardNumber && <div className='invalid-feedback'>{formik.errors.cardNumber}</div>}
				</div>
				<div className='row g-3 mb-3'>
					<div className='col-md-6'>
						<label htmlFor='expirationDate' className='form-label text-secondary'>
							Expiration Date: *
						</label>
						<PatternFormat
							type='text'
							id='expirationDate'
							className={`form-control ${formik.touched.expirationDate && formik.errors.expirationDate ? 'is-invalid' : ''}`}
							placeholder='MM/YY'
							format='##/##'
							mask={'_'}
							disabled={formik.isSubmitting}
							value={formik.values.expirationDate}
							onValueChange={(values) => {
								const { formattedValue } = values
								formik.setFieldValue('expirationDate', formattedValue)
							}}
							style={{
								height: 48,
							}}
						/>
						{formik.touched.expirationDate && formik.errors.expirationDate && <div className='invalid-feedback'>{formik.errors.expirationDate}</div>}
					</div>
					<div className='col-md-6'>
						<label htmlFor='amount' className='form-label text-secondary'>
							Amount: *
						</label>
						<NumericFormat
							type='text'
							id='amount'
							className={`form-control ${formik.touched.amount && formik.errors.amount ? 'is-invalid' : ''}`}
							placeholder='$0.00'
							prefix={'$'}
							allowLeadingZeros
							thousandSeparator=','
							fixedDecimalScale
							decimalScale={2}
							maxLength={20}
							disabled={formik.isSubmitting}
							value={formik.values.amount}
							onValueChange={(values) => {
								const { formattedValue } = values
								formik.setFieldValue('amount', formattedValue)
							}}
							style={{
								height: 48,
							}}
						/>
						{formik.touched.amount && formik.errors.amount && <div className='invalid-feedback'>{formik.errors.amount}</div>}
					</div>
				</div>
				<div className='row g-3 mb-3'>
					<div className='col-md-6'>
						<label htmlFor='referenceNumber' className='form-label text-secondary'>
							Reference Number: *
						</label>
						<input
							type='text'
							className={`form-control ${formik.touched.referenceNumber && formik.errors.referenceNumber ? 'is-invalid' : ''}`}
							id='referenceNumber'
							placeholder='XXXXXXXXXXXXXXXX'
							maxLength={30}
							autoCorrect='off'
							autoCapitalize='none'
							disabled={formik.isSubmitting}
							value={formik.values.referenceNumber}
							onChange={formik.handleChange}
							style={{
								height: 48,
							}}
						/>
						{formik.touched.referenceNumber && formik.errors.referenceNumber && <div className='invalid-feedback'>{formik.errors.referenceNumber}</div>}
					</div>
					<div className='col-md-6'>
						<label htmlFor='codeActivated' className='form-label text-secondary'>
							Activation Code: *
						</label>
						<NumericFormat
							type='text'
							id='codeActivated'
							className={`form-control ${formik.touched.codeActivated && formik.errors.codeActivated ? 'is-invalid' : ''}`}
							placeholder='XXXX'
							allowLeadingZeros
							maxLength={4}
							disabled={formik.isSubmitting}
							value={formik.values.codeActivated}
							onValueChange={(values) => {
								const { value } = values
								formik.setFieldValue('codeActivated', value)
							}}
							style={{
								height: 48,
							}}
						/>
						{formik.touched.codeActivated && formik.errors.codeActivated && <div className='invalid-feedback'>{formik.errors.codeActivated}</div>}
					</div>
				</div>
				<div className='row g-3 mb-3'>
					<div className='col-md-6'>
						<label htmlFor='madeOn' className='form-label text-secondary'>
							Made On: *
						</label>
						<PatternFormat
							type='text'
							id='madeOn'
							className={`form-control ${formik.touched.madeOn && formik.errors.madeOn ? 'is-invalid' : ''}`}
							placeholder='YYYY/MM/DD HH:MM:SS'
							format='####/##/## ##:##:##'
							mask={'_'}
							disabled={formik.isSubmitting}
							value={formik.values.madeOn}
							onValueChange={(values) => {
								const { formattedValue } = values
								formik.setFieldValue('madeOn', formattedValue)
							}}
							style={{
								height: 48,
							}}
						/>
						{formik.touched.madeOn && formik.errors.madeOn && <div className='invalid-feedback'>{formik.errors.madeOn}</div>}
					</div>
					<div className='col-md-6'>
						<label htmlFor='protocol' className='form-label text-secondary'>
							Protocol: *
						</label>
						<input
							type='text'
							id='protocol'
							className={`form-control ${formik.touched.protocol && formik.errors.protocol ? 'is-invalid' : ''}`}
							placeholder='101.1'
							maxLength={30}
							autoCorrect='off'
							autoCapitalize='none'
							disabled={formik.isSubmitting}
							value={formik.values.protocol}
							onChange={formik.handleChange}
							style={{
								height: 48,
							}}
						/>
						{formik.touched.protocol && formik.errors.protocol && <div className='invalid-feedback'>{formik.errors.protocol}</div>}
					</div>
				</div>
				<div className='d-grid'>
					<button
						type='submit'
						className='btn btn-success'
						disabled={formik.isSubmitting}
						style={{
							position: 'relative',
							height: 48,
						}}
					>
						<span role='status'>Submit</span>
						{formik.isSubmitting && (
							<span
								className='spinner-border spinner-border-sm'
								aria-hidden='true'
								style={{
									position: 'absolute',
									top: 16,
									right: 16,
								}}
							/>
						)}
					</button>
				</div>
			</form>
			<div
				style={{
					position: 'absolute',
					top: '-9999px',
					left: '-9999px',
					opacity: 0,
					pointerEvents: 'none',
				}}
			>
				<div ref={activatingTransactionRef}>
					<ActivatingTransaction item={{ ...formik.values, barCode, authorizationCode }} />
				</div>
				<div ref={cardInformationRef}>
					<CardInformation item={{ ...formik.values, barCode, authorizationCode }} />
				</div>
				<div ref={authorizationStatusRef}>
					<AuthorizationStatus item={{ ...formik.values, barCode, authorizationCode }} />
				</div>
			</div>
		</div>
	)
}

export default App
