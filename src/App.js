import { useState } from 'react';
import Input from './components/Input';
import Button from './components/Button';
import { Container, Content, Row } from './styles';

const INITIAL_VALUE = '0';

const operations = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	X: (a, b) => a * b,
	'/': (a, b) => (b !== 0 ? a / b : 'Erro'),
	'%': (a, b) => a % b,
};

const App = () => {
	const [currentNumber, setCurrentNumber] = useState(INITIAL_VALUE);
	const [firstNumber, setFirstNumber] = useState(INITIAL_VALUE);
	const [operation, setOperation] = useState('');

	const handleOnClear = () => {
		setCurrentNumber(INITIAL_VALUE);
		setFirstNumber(INITIAL_VALUE);
		setOperation('');
	};

	const handleAddNumber = (num) => {
		setCurrentNumber((prev) =>
			prev === INITIAL_VALUE ? num : `${prev}${num}`
		);
	};

	const handleOperation = (op) => {
		if (firstNumber === INITIAL_VALUE) {
			setFirstNumber(currentNumber);
			setCurrentNumber(INITIAL_VALUE);
			setOperation(op);
		} else {
			handleEquals();
			setOperation(op);
		}
	};

	const handleEquals = () => {
		if (
			firstNumber !== INITIAL_VALUE &&
			operation !== '' &&
			currentNumber !== INITIAL_VALUE
		) {
			const calc = operations[operation];
			if (calc) {
				const result = calc(
					parseFloat(firstNumber),
					parseFloat(currentNumber)
				);
				setCurrentNumber(String(result));
				setFirstNumber(INITIAL_VALUE);
				setOperation('');
			}
		}
	};

	const handleDecimal = () => {
		if (!currentNumber.includes('.')) {
			setCurrentNumber((prev) => `${prev}.`);
		}
	};

	const formatNumber = (num) => {
		return parseFloat(num).toLocaleString('pt-BR', {
			maximumFractionDigits: 8,
		});
	};

	return (
		<Container>
			<Content>
				<Input value={formatNumber(currentNumber)} />
				<Row>
					<Button label="x" onClick={() => handleOperation('X')} />
					<Button label="/" onClick={() => handleOperation('/')} />
					<Button label="c" onClick={handleOnClear} />
					<Button label="%" onClick={() => handleOperation('%')} />
				</Row>
				<Row>
					<Button label="7" onClick={() => handleAddNumber('7')} />
					<Button label="8" onClick={() => handleAddNumber('8')} />
					<Button label="9" onClick={() => handleAddNumber('9')} />
					<Button label="-" onClick={() => handleOperation('-')} />
				</Row>
				<Row>
					<Button label="4" onClick={() => handleAddNumber('4')} />
					<Button label="5" onClick={() => handleAddNumber('5')} />
					<Button label="6" onClick={() => handleAddNumber('6')} />
					<Button label="+" onClick={() => handleOperation('+')} />
				</Row>
				<Row>
					<Button label="1" onClick={() => handleAddNumber('1')} />
					<Button label="2" onClick={() => handleAddNumber('2')} />
					<Button label="3" onClick={() => handleAddNumber('3')} />
					<Button label="." onClick={handleDecimal} />
				</Row>
				<Row>
					<Button label="0" onClick={() => handleAddNumber('0')} />
					<Button label="=" onClick={handleEquals} />
				</Row>
			</Content>
		</Container>
	);
};

export default App;
