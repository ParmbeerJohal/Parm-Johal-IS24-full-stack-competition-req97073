/**
 * @file ProductFiltersRow.js
 * @author Parm Johal
 * @description This is the component that displays the filters for the product list.
 */

import { useEffect } from "react";
import {
    Row,
    Col,
    Input,
    Label,
} from "reactstrap";

/**
 * @function ProductFiltersRow
 * @description This is the component that displays the filters for the product list.
 * @param { filtersObject, setFiltersObject, setListFiltered } props
 * @return {JSX.Element}
 */
function ProductFiltersRow(props) {
    const {
        filtersObject,
        setFiltersObject,
        setListFiltered,
    } = props;

    // Check if the filters are empty
    useEffect(() => {
        if (
            filtersObject.productNameFilter === "" &&
            filtersObject.scrumMasterFilter === "" &&
            filtersObject.productOwnerFilter === "" &&
            filtersObject.developerNameFilter === "" &&
            filtersObject.startDateFilter === "" &&
            filtersObject.methodologyFilter === ""
        ) {
            setListFiltered(false);
            return;
        }
        setListFiltered(true);
    }, [filtersObject, setListFiltered]);

    return (
        <Row>
            <Col
                sm={{
                    offset: 1,
                    size: 2
                }}>
                <Label for="productNameFilter">Product Name Filter</Label>
                <Input
                    type="text"
                    name="productNameFilter"
                    id="productNameFilter"
                    className="productListFilter"
                    value={filtersObject.productNameFilter}
                    onChange={(e) => setFiltersObject({ ...filtersObject, productNameFilter: e.target.value })}
                    data-setterfunction="setproductNameFilter"
                />
            </Col>
            <Col
                sm={{
                    size: 2
                }}>
                <Label for="scrumMasterFilter">Scrum Master Filter</Label>
                <Input
                    type="text"
                    name="scrumMasterFilter"
                    id="scrumMasterFilter"
                    className="productListFilter"
                    value={filtersObject.scrumMasterFilter}
                    onChange={(e) => setFiltersObject({ ...filtersObject, scrumMasterFilter: e.target.value })}
                    data-setterfunction="setScrumMasterFilter"
                />
            </Col>
            <Col>
                <Label for="productOwnerFilter">Product Owner Filter</Label>
                <Input
                    type="text"
                    name="productOwnerFilter"
                    id="productOwnerFilter"
                    className="productListFilter"
                    value={filtersObject.productOwnerFilter}
                    onChange={(e) => setFiltersObject({ ...filtersObject, productOwnerFilter: e.target.value })}
                    data-setterfunction="setProductOwnerFilter"
                />
            </Col>
            <Col>
                <Label for="developerNameFilter">Developer Names Filter</Label>
                <Input
                    type="text"
                    name="developerNameFilter"
                    id="developerNameFilter"
                    className="productListFilter"
                    value={filtersObject.developerNameFilter}
                    onChange={(e) => setFiltersObject({ ...filtersObject, developerNameFilter: e.target.value })}
                    data-setterfunction="setDeveloperNameFilter"
                />
            </Col>
            <Col>
                <Label for="startDateFilter">Start Date Filter</Label>
                <Input
                    type="text"
                    name="startDateFilter"
                    id="startDateFilter"
                    className="productListFilter"
                    value={filtersObject.startDateFilter}
                    onChange={(e) => setFiltersObject({ ...filtersObject, startDateFilter: e.target.value })}
                    data-setterfunction="setStartDateFilter"
                />
            </Col>
            <Col>
                <Label for="methodologyFilter">Methodology Filter</Label>
                <Input
                    type="select"
                    name="methodologyFilter"
                    id="methodologyFilter"
                    className="productListFilter"
                    value={filtersObject.methodologyFilter}
                    onChange={(e) => setFiltersObject({ ...filtersObject, methodologyFilter: e.target.value })}
                    data-setterfunction="setMethodologyFilter"
                >
                    <option value=""></option>
                    <option value="Agile">Agile</option>
                    <option value="Waterfall">Waterfall</option>
                </Input>
            </Col>
        </Row>
    );
}

export default ProductFiltersRow;