import React from 'react';
import { createTestInstance } from '@magento/peregrine';

import OrderTotal from '../orderTotal';

const defaultProps = {
    data: {
        discounts: [
            {
                amount: {
                    currency: 'USD',
                    value: 123
                }
            }
        ],
        grand_total: {
            currency: 'USD',
            value: 1434
        },
        subtotal: {
            currency: 'USD',
            value: 1234
        },
        total_tax: {
            currency: 'USD',
            value: 34
        },
        total_shipping: {
            currency: 'USD',
            value: 12
        }
    }
};

test('should render properly', () => {
    const tree = createTestInstance(<OrderTotal {...defaultProps} />);

    expect(tree.toJSON()).toMatchSnapshot();
});