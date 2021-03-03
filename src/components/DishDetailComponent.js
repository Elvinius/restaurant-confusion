import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCommentModalOpen: false
        }
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCommentModal() {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleCommentModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render() {
        const numbers = [1, 2, 3, 4, 5];
        return (
            <>
                <Button outline onClick={this.toggleCommentModal} className="mb-2"><span className="fa fa-pencil fa-lg mr-1" ></span>Submit Comment</Button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
                    <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control"
                                        defaultValue={1}>
                                        {numbers.map(number => <option key={number}>{number}</option>)}
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger" model=".author" show="touched" messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />

                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={2} >Comment</Label>
                                <Col>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors className="text-danger" model=".comment" show="touched" messages={{
                                        required: 'Please, add a comment'
                                    }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

const RenderDish = (props) => {
    if (props.dish != null) {
        return (
            <React.Fragment>
                <div className="col-12 col-md-5 m-1">
                    <FadeTransform in transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                        <Card key={props.dish.id}>
                            <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
                            <CardBody>
                                <CardTitle>{props.dish.name}</CardTitle>
                                <CardText>{props.dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </FadeTransform>
                </div>
                <RenderComments comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dishId} />

            </React.Fragment>
        );
    } else {
        return (
            <div></div>
        );
    }
}

const RenderComments = ({ comments, postComment, dishId }) => {
    if (comments != null) {
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in>
                        {comments.map(singlecomment => {
                            return (
                                <Fade in>
                                    <li key={singlecomment.id}>
                                        <p>{singlecomment.comment}</p>
                                        <p>-- {singlecomment.author}, {new Date(singlecomment.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</p>
                                    </li>
                                </Fade>
                            );
                        })}
                    </Stagger>
                </ul>

                <CommentForm dishId={dishId} postComment={postComment} />
            </div >
        );
    } else {
        return (
            <div></div>
        )
    }
}
const DishDetail = ({ dish, comments, postComment, isLoading, isErrMessage }) => {
    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    } else if (isErrMessage) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{isErrMessage}</h4>
                </div>
            </div>
        )
    } else {
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
                    <RenderDish dish={dish} comments={comments} postComment={postComment} dishId={dish.id} />
                </div>
            </div>

        );
    }

}

export default DishDetail