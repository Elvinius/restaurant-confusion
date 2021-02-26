import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';

class DishDetail extends Component {
    renderDish(dish) {
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
                        {this.renderComments(dish.comments)}
                    </div>

                </React.Fragment>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComments(comments) {

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

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish)}
                </div>
            </div>

        )
    }
}


export default DishDetail