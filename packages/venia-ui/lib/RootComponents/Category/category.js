import React, { Fragment } from 'react';
import { number, shape, string } from 'prop-types';
import { useCategory } from '@magento/peregrine/lib/talons/RootComponents/Category';
import { mergeClasses } from '../../classify';
import { fullPageLoadingIndicator } from '../../components/LoadingIndicator';

import CategoryContent from './categoryContent';
import defaultClasses from './category.css';
import { Meta } from '../../components/Head';

import GET_CATEGORY from '../../queries/getCategory.graphql';
import FILTER_INTROSPECTION from '../../queries/introspection/filterIntrospectionQuery.graphql';
import GET_CONFIG_DATA from '../../queries/getStoreConfigData.graphql';
import { useScrollTopOnChange } from '@magento/peregrine/lib/hooks/useScrollTopOnChange';

const Category = props => {
    const { id } = props;

    const talonProps = useCategory({
        id,
        queries: {
            getCategory: GET_CATEGORY,
            getFiltersIntrospection: FILTER_INTROSPECTION,
            getStoreConfig: GET_CONFIG_DATA
        }
    });

    const {
        error,
        metaDescription,
        loading,
        categoryData,
        pageControl,
        sortProps,
        pageSize
    } = talonProps;

    const classes = mergeClasses(defaultClasses, props.classes);
    useScrollTopOnChange(pageControl.currentPage);

    if (error && pageControl.currentPage === 1 && !loading) {
        if (process.env.NODE_ENV !== 'production') {
            console.error(error);
        }
        return <div>Data Fetch Error</div>;
    }

    // Show the loading indicator until data has been fetched.
    if (loading) {
        return fullPageLoadingIndicator;
    }

    return (
        <Fragment>
            <Meta name="description" content={metaDescription} />
            <CategoryContent
                categoryId={id}
                classes={classes}
                data={categoryData}
                pageControl={pageControl}
                sortProps={sortProps}
                pageSize={pageSize}
            />
        </Fragment>
    );
};

Category.propTypes = {
    classes: shape({
        gallery: string,
        root: string,
        title: string
    }),
    id: number
};

Category.defaultProps = {
    id: 3
};

export default Category;
