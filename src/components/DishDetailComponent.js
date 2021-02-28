import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderDish = ({ dish, comments }) => {
    if (dish != null) {
        return (
            <React.Fragment>
                <div className="col-12 col-md-5 m-1">
                    <Card key={dish.id}>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={comments} />
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <div></div>
        );
    }
}

const RenderComments = ({ comments }) => {
    if (comments != null) {
        const foodComments =
            comments.map(singlecomment => {
                return (
                    <div key={singlecomment.id}>
                        <ul className="list-unstyled">
                            <li>
                                <p>{singlecomment.comment}</p>
                                {console.log(singlecomment.author)}
                                <p>-- {singlecomment.author}, {new Date(singlecomment.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                            </li>
                        </ul>
                    </div>
                );
            });
        return (
            <div>
                <h4>Comments</h4>
                {foodComments}
            </div>
        )

    } else {
        return (
            <div></div>
        )
    }
}
const DishDetail = ({ dish, comments }) => {
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <RenderDish dish={dish} comments={comments} />
            </div>
        </div>

    )
}

export default DishDetail