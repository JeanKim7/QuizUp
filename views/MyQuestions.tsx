import Accordion  from 'react-bootstrap/Accordion'

type Props = {}

export default function MyQuestions({}: Props) {
  return (
        <>
            <h1 className = "text-center my-3">My Account</h1>
            <Accordion>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>Create a Question</Accordion.Header>
                    <Accordion.Body>

                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>Edit a Question</Accordion.Header>
                    <Accordion.Body>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='2'>
                    <Accordion.Header>Delete a Question</Accordion.Header>
                    <Accordion.Body>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
  )
}