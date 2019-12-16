import React from 'react';
import './SearchBoxCombo.css';

/*
Mandatory props to be passed 

dataSource  --     Array of objects in format [{id:1,value:'something'}] 
                                                                                                   | default ('')    
Additional props

selectedItem -- (obj {id:"",dropdownName:""}) to set selection                                       | default (null)
allowClear   -- (string 'true' | 'false') to display clear icon (to clear the selected value)        | default (true)
placeHolder  -- (string)  the text to be shown as place-holder text                                  | default (Select)
*/

class SearchBoxCombo extends React.Component {


    constructor(props) {
        super(props);
        this.state = { data: null, isDropdownOpen: false, selectedItem: null };
        this.placeHolder = 'Select',
            this.dataSourceStatic = false,
            this.KEY = {
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                UP: 38,
                DOWN: 40
            },
            this.mouseLastPos = {
                x: 0,
                y: 0
            }

        /* Initializing Defaults */
        if (this.props.dataSource) {
            switch (typeof (this.props.dataSource)) {
                case 'object':
                    this.dataSourceStatic = true;
                    break;
            }
        }
        this.placeHolder = this.props.placeHolder ? this.props.placeHolder : this.placeHolder;
        this.filterOn = this.props.filterOn ? this.props.filterOn : '';
        this.allowClear = this.setBoolean(this.props.allowClear);

        this.searchComboBoxRef = React.createRef();
        this.resultRef = React.createRef();
        this.ulWrapperRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onClickOutside);

    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOutside);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selectedItem !== undefined && nextProps.selectedItem !== this.state.selectedItem) {
            this.setState({ selectedItem: nextProps.selectedItem });
        }
    }

    onClickOutside = (event) => {
        if (this.searchComboBoxRef && !this.searchComboBoxRef.current.contains(event.target)) {
            this.setDefaults();
        }
    }

    setDefaults = () => {
        this.setState({ data: null, isDropdownOpen: false });
    }

    setBoolean = (name) => {
        let returnValue = false;
        switch (name) {
            case 'false':
                returnValue = false;
                break;
            case undefined:
                returnValue = true;
                break;
            default:
                returnValue = true;
        }
        return returnValue;
    }

    onElementEnter = (event) => {
        if (this.mouseLastPos && event.pageY !== this.mouseLastPos.y) {
            this.mouseLastPos = { ...this.mouseLastPos, x: event.pageX, y: event.pageY }
            event.preventDefault();
            let highlightedElements = this.ulWrapperRef.current ? this.ulWrapperRef.current.querySelectorAll('.li-highlighted') : [];
            highlightedElements.forEach((Element) => {
                Element.classList.remove('li-highlighted');
            })
            event.currentTarget.classList.add('li-highlighted');
        }
    }

    onElementLeave = (event) => {
        event.currentTarget.classList.remove('li-highlighted');
    }

    handleKeyPress = (event) => {
        let selectedElement = this.ulWrapperRef.current.querySelector('.li-highlighted');
        if (selectedElement && selectedElement !== null) {
            switch (event.keyCode) {
                case this.KEY.UP:
                    if (selectedElement.previousSibling) {
                        selectedElement.previousSibling.classList.add('li-highlighted');
                        selectedElement.classList.remove('li-highlighted');
                        this.movetoCurrentElement();
                    }
                    break;
                case this.KEY.DOWN:
                    if (selectedElement.nextSibling) {
                        selectedElement.nextSibling.classList.add('li-highlighted');
                        selectedElement.classList.remove('li-highlighted');
                        this.movetoCurrentElement();
                    }
                    break;
                case this.KEY.ENTER:
                case this.KEY.TAB:
                    event.preventDefault();
                    this.onKeyEnterTab();
                    break;
                case this.KEY.ESC:
                    this.setDefaults();
                    break;
            }
        }
    }

    movetoCurrentElement = () => {
        let ul = this.ulWrapperRef.current.querySelector('.result-listItems');
        let current = this.ulWrapperRef.current.querySelector('.li-highlighted');
        ul.scrollTop = current.offsetTop - ul.offsetHeight;
    }

    onKeyEnterTab = () => {
        let selected = this.ulWrapperRef.current.querySelector('.li-highlighted');
        let filterOnData = this.state.data;
        let selectedFromArray = filterOnData.filter((obj, index) => {
            if (index.toString() === selected.dataset.index) {
                return true;
            }
        });
        this.triggerAction(selectedFromArray[0]);
        this.setDefaults();
    }

    onElementClick = (obj) => {
        this.triggerAction(obj);
        this.setDefaults();
    }

    triggerAction = (item) => {
        let obj = { data: item, question_id: this.props.question_id };
        this.setState({ selectedItem: item }, () => {
            if (this.props.onChange) {
                this.props.onChange(obj);
            }
        });
    };

    onDropdownClick = (e) => {
        if (!this.state.isDropdownOpen) {
            this.setState({ isDropdownOpen: !this.state.isDropdownOpen }, () => {
                this.serviceCall();
                    this.ulWrapperRef.current.focus();
            });
        } else {
            this.setDefaults();
        }
    }

    clearSelected = (event) => {
        this.triggerAction(null);
        event.stopPropagation();
    }

    serviceCall = () => {
        if (this.dataSourceStatic) {
            this.setState({
                data: this.props.dataSource
            })
        } 
    }

    renderList = (data) => {
        if (data != null) {
            let updatedDataListItems = data.map((obj, index) => {
                return <li key={index} data-index={index}
                    className={index === 0 ? 'search-result-li li-highlighted' : 'search-result-li'}
                    onKeyDown={this.handleKeyPress}
                    onMouseEnter={this.onElementEnter}
                    onClick={() => this.onElementClick(obj)}>
                    <div className='li-result-label'>{obj.value}</div>
                </li>;
            });
            return updatedDataListItems;
        } else {
            return '';
        }
    }

    render() {
        return <div className="searchbox-main-container" ref={this.searchComboBoxRef} style={this.props.style ? this.props.style : {}}>
            <div className="selectValue-container" onClick={this.onDropdownClick}>
                {this.state.selectedItem ? <div className='selected-value' style={this.allowClear ? { width: "calc(100% - 50px)" } : { width: "calc(100% - 40px)" }}><div ref={this.resultRef}>{this.state.selectedItem.value}</div></div> : <div className='placeHolder-value'><div ref={this.resultRef}>{this.placeHolder}</div></div>}
                <div className="aside-container">
                    {this.state.selectedItem && this.allowClear ? <div className="clear-icon" onClick={this.clearSelected}></div> : null}
                    <div className={this.state.isDropdownOpen ? 'dropdown-box-open' : 'dropdown-box'}>
                        <b className='dropdown-arrow'></b>
                    </div>
                </div>
            </div>
            {this.state.isDropdownOpen ? <div className='dropdown-container'>
                <div className="ul-list-wrapper" ref={this.ulWrapperRef}  onKeyDown={(e) => this.handleKeyPress(e)} tabIndex={0}><ul className='result-listItems' >{this.renderList(this.state.data)}</ul></div>
            </div> : null}
        </div>

    }

}

export default SearchBoxCombo;
