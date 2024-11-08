import * as React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';

interface ListItem {
    id: string;
    status: 'A' | 'P';
    value: string;
}

const list1: ListItem[] = [
    {
        id: '4f851d66-0d95-4de9-b1f7-ec6fdfa2fdf6',
        status: 'A',
        value: 'mickey mouse'
    },
    {
        id: '0f0edb81-1855-4f49-845c-a35ddaf4204f',
        status: 'A',
        value: 'mini mouse'
    },
    {
        id: 'f06220a3-f854-4762-add8-ab4927919f82',
        status: 'A',
        value: 'pluto'
    },
];
const list2: ListItem[] = [
    {
        id: '62832b04-98bd-4b73-94e9-3008caaa2e3a',
        status: 'A',
        value: 'goofy'
    },
    {
        id: '992920ac-fcbd-47ea-8a49-60dffc655a3c',
        status: 'A',
        value: 'donald duck'
    },
    {
        id: 'e529088b-c564-4c2c-86b1-f10c827d60c6',
        status: 'A',
        value: 'pete'
    },
];

function not(a: readonly ListItem[], b: readonly ListItem[]) {
    return a.filter((value) => !b.some((item) => item.id === value.id));
}

function intersection(a: readonly ListItem[], b: readonly ListItem[]) {
    return a.filter((value) => b.some((item) => item.id === value.id));
}

const TransferListElementComponent = () => {
    const [checked, setChecked] = React.useState<readonly ListItem[]>([]);
    const [left, setLeft] = React.useState<readonly ListItem[]>(list1);
    const [right, setRight] = React.useState<readonly ListItem[]>(list2);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (item: ListItem) => () => {
        const currentIndex = checked.findIndex((checkedItem) => checkedItem.id === item.id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(item);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    React.useEffect(() => {
        console.log({ left });
        console.log({ right });

    }, [left, right])

    const customList = (items: readonly ListItem[]) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <List dense component="div" role="list">
                {items.map((item: ListItem) => {
                    const labelId = `transfer-list-item-${item.id}-label`;

                    return (
                        <ListItemButton
                            key={item.id}
                            role="listitem"
                            onClick={handleToggle(item)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.some((checkedItem) => checkedItem.id === item.id)}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={item.value} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Paper>
    );

    return (
        <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" sx={{ alignItems: 'center' }}>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    );
}

export default TransferListElementComponent;