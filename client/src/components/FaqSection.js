import { Accordion } from 'react-bootstrap';
import './FaqSection.css';

const FaqSection = ({ category }) => {
    const faqData = {
        order: [
            { q: "WHAT'S INCLUDED WITH EACH INDOOR PLANT?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." },
            { q: "CAN I CANCEL OR CHANGE MY ORDER?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." },
            { q: "CAN I RETURN PLANTS?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." },
            { q: "MY PLANT ARRIVED! WHAT DO I DO NEXT?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." }
        ],
        returns: [
            { q: "WHAT'S INCLUDED WITH EACH INDOOR PLANT?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." },
            { q: "CAN I CANCEL OR CHANGE MY ORDER?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." },
            { q: "CAN I RETURN PLANTS?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." },
            { q: "MY PLANT ARRIVED! WHAT DO I DO NEXT?", a: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." }
        ]
    };

    const currentFaqs = faqData[category] || faqData.order;

    return (
        <Accordion flush className="custom-accordion">
            {currentFaqs.map((item, index) => (
                <Accordion.Item key={index} eventKey={index.toString()}>
                    <Accordion.Header>{item.q}</Accordion.Header>
                    <Accordion.Body>{item.a}</Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export default FaqSection;
