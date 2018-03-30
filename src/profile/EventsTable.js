import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, withStyles, Button } from 'material-ui';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';

import * as eventsActions from '../events/EventsActions';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        minWidth: 700,
    },
    heading: {
        margin: 8
    },
});

class EventsTable extends React.Component {
    static propTypes = {
        unsubscribeEvent: PropTypes.func.isRequired,
        subscribeEvent: PropTypes.func.isRequired,
        events: PropTypes.array.isRequired,
        username: PropTypes.string,
        isCurrentUser: PropTypes.bool.isRequired
    };

    toEvent = (eventId) => {
        this.props.history.push(`/event/${eventId}`);
    };

    subEvent = (eventId) => {
        this.props.subscribeEvent(eventId);

    };

    unsubEvent = (eventId) => {
        this.props.unsubscribeEvent(eventId, null, this.props.username);
    };

    formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        return `${day}.${month < 10 ? `0${month}` : month}.${year}`;
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Typography className={classes.heading} variant="headline" component="h2">Пробежки</Typography>
                <Table>
                    <TableBody>
                        {this.props.events.map(ev => {
                            return (
                                <TableRow key={ev._id}>
                                    <TableCell>{ev.title}</TableCell>
                                    <TableCell>{this.formatDate(new Date(ev.date))}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="raised"
                                            color="primary"
                                            type="submit"
                                            onClick={() => this.toEvent(ev._id)}
                                        >
                                            На карте
                                        </Button>
                                    </TableCell>
                                    {this.props.isCurrentUser ?
                                        <TableCell>
                                            <Button
                                                variant="raised"
                                                color="secondary"
                                                type="submit"
                                                onClick={() => this.unsubEvent(ev._id)}
                                            >
                                                Отписаться
                                            </Button>
                                        </TableCell> :
                                        <TableCell>
                                            <Button
                                                variant="raised"
                                                color="secondary"
                                                type="submit"
                                                onClick={() => this.subEvent(ev._id)}
                                            >
                                                Подписаться
                                            </Button>
                                        </TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
    unsubscribeEvent: eventsActions.unsubscribeEventRequest,
    subscribeEvent: eventsActions.subscribeEventRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EventsTable));
