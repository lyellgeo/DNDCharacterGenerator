import React from 'react'
import equipmentData from './data/equipmentData.js'
import weaponsData from './data/weaponsData.js';
import armourData from './data/armourData.js';
import classOptionsData from './data/classOptionsData'
import EquipmentOptions from './EquipmentOptions.js';
import EquipmentBackpack from './EquipmentBackpack.js';
import { StickyContainer, Sticky} from 'react-sticky';


class EquipmentScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gold: null,
            equipment: [],
            equipmentSelected: "Backpack",
            armour: [],
            armourSelected: "none",
            shieldSelected: false,
            weapons: [],
            weaponSelected: "Sword",
        }
    }

    getRndInteger = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getGold = () => {
        this.setState({gold: this.props.gold})
    }

    d = (how_many, sides) => {
        var total = 0;
        var i;
        for (i = 0; i < how_many; i++) {
            total += this.getRndInteger(1, sides);
        }
        return total;
    }

    equipmentList = () => equipmentData.map(
        item =>
            (<EquipmentOptions
                price={item.price}
                name={item.name}
                key={item.name}
            >
            </EquipmentOptions>)
    )

    weaponsOptions = (item) =>  {
        return (
            <option value={item.name}
                price={item.price}
                damage = {item.damage}
            >
                {item.name} ({item.damage}) - {item.price} gp
            </option>
        )
    }

    weaponsList = () => weaponsData.map(
        item => this.weaponsOptions(item)
    )


    equipmentBackpack = () => this.state.equipment.map((item, index) =>
        (<EquipmentBackpack name={item}
            sellSelectedEquipment={this.sellSelectedEquipment}
            keyName={index}
        >
        </EquipmentBackpack>)
    )

    weaponsBackpack = () =>  this.state.weapons.map((item, index) => {

        return ( 
            <li 
            className = "backpack-item backpack-item--weapon"
            value = {item}
            key = {index}>
             
            {item} 
            <button
            className="button button--equipment button--weapon" 
            value = {item}
            onClick = {() => this.sellSelectedWeapon(item)}> 
            Sell 
            </button> 
        </li>
        )
    }) 

    armourBackpack = () =>  this.state.armour.map((item, index) => {

        return ( 
            <li className = "backpack-item backpack-item--armour"
            value = {item}
            key = {index}> 
            {item} 
            <button
            className="button button--equipment button--armour" 
            value = {item}
            onClick = {() => this.sellSelectedArmour(item)}> 
            Sell 
            </button> 
        </li>
        )
    }) 



    updateSelectedEquipment = (event) => {

        this.setState({ equipmentSelected: event.target.value })

    }


    buySelectedEquipment = () => {

        var equipmentSelected = this.state.equipmentSelected;

        function findItem(object) {
            return object.name === equipmentSelected
        }

        var itemObject = equipmentData.find(findItem)

        if (itemObject.price > this.state.gold) {
            return console.log("Insufficient funds")
        }

        //updates state with new equipment item

        var newObject = {
            gold: this.state.gold - itemObject.price,
            equipment: this.state.equipment.concat(itemObject.name)
        }

        this.setState(newObject)

    }


    sellSelectedEquipment = (itemName) => {


        function findItem(object) {
            return object.name === itemName
        }

        var itemObject = equipmentData.find(findItem)

        var counter = 0

        const removeTheItem = (item) => {

            if (counter > 0) {
                return true
            }

            if (itemObject.name === item) {
                counter++
                return false
            }

            return true;
        }

        var newArray = this.state.equipment.filter(removeTheItem)

        var newObject = {
            gold: this.state.gold + itemObject.price,
            // equipment is same except for item is removed from array
            equipment: newArray
        }
        this.setState(newObject)

    }

    updateSelectedWeapon = (event) => {

        this.setState({ weaponSelected: event.target.value })

    }


    buySelectedWeapon = () => {

        var equipmentSelected = this.state.weaponSelected;

        function findItem(object) {
            return object.name === equipmentSelected
        }

        var itemObject = weaponsData.find(findItem)

        if (itemObject.price > this.state.gold) {
            return console.log("Insufficient funds")
        }

        //updates state with new equipment item

        var newObject = {
            gold: this.state.gold - itemObject.price,
            weapons: this.state.weapons.concat(itemObject.name)
        }

        this.setState(newObject)

    }


    sellSelectedWeapon = (itemName) => {


        function findItem(object) {
            return object.name === itemName
        }

        var itemObject = weaponsData.find(findItem)

        var counter = 0

        const removeTheItem = (item) => {

            if (counter > 0) {
                return true
            }

            if (itemObject.name === item) {
                counter++
                return false
            }

            return true;
        }

        var newArray = this.state.weapons.filter(removeTheItem)

        var newObject = {
            gold: this.state.gold + itemObject.price,
            // equipment is same except for item is removed from array
            weapons: newArray
        }
        this.setState(newObject)

    };

    handleOptionChange = event => {
        this.setState({
          armourSelected: event.target.value
        });
      };

    handleShieldChange= () => {

        if (!this.state.shieldSelected === true) {
            this.setState({
                shieldSelected: true
            })
        } else {
            this.setState({
                shieldSelected: false
            })
        }

    }

    buySelectedArmour = () => {

        
        var equipmentSelected = this.state.armourSelected;

        if (equipmentSelected === "none") {return};

        function findItem(object) {
            return object.name === equipmentSelected
        }

        var itemObject = armourData.find(findItem)

        if (itemObject.price > this.state.gold) {
            return console.log("Insufficient funds")
        }

        if (this.state.shieldSelected && itemObject.price + 10 > this.state.gold) {
            return console.log("Insufficient funds")
        }

        //updates state with new equipment item

        

        var newObject = {
            gold: this.state.gold - itemObject.price,
            armour: this.state.armour.concat(itemObject.name)
        }

        if (this.state.shieldSelected) {
            newObject = {
                gold: this.state.gold - itemObject.price - 10,
                armour: this.state.armour.concat(itemObject.name).concat("Shield")
            }
        }

        this.setState(newObject)

        // adds shield if selected

        

    }


    sellSelectedArmour = (itemName) => {

        function findItem(object) {
            return object.name === itemName
        }

        var itemObject = armourData.find(findItem)

        var counter = 0

        const removeTheItem = (item) => {

            if (counter > 0) {
                return true
            }

            if (itemObject.name === item) {
                counter++
                return false
            }

            return true;
        }

        var newArray = this.state.armour.filter(removeTheItem)

        var newObject = {
            gold: this.state.gold + itemObject.price,
            // equipment is same except for item is removed from array
            armour: newArray
        }
        this.setState(newObject)

    };



    


    render() {

    var characterClass = classOptionsData.find(obj => obj.name === this.props.characterClass) 
        

return (

    <div className="equipment-screen">

    <StickyContainer>

    
    <Sticky>{({ style }) => <div className="gold-container"> <h5 style={style} className="gold">

        {this.state.gold} gp
        
        {this.state.gold === null &&
        <button className="button button-primary button--gold" 
        onClick={() => setTimeout(this.getGold(), 200)}> 
        Roll Gold
        </button>}

        
    
    
    </h5>
    
    </div>}
    </Sticky>

    <div className="equipment-container--header">Armour</div>

    <div className="equipment-restrictions">Allowed Armour: {characterClass.armour}</div>

    {!characterClass.armour.includes("none") &&
    
    <div className="armour-container">

        <div className="radio-container">

       
        <label className="armour-radio">
        <input
        type="radio"
        value="Leather"
        className="form-check-input"
        checked={this.state.armourSelected === "Leather"}
        onChange={this.handleOptionChange}
        disabled={characterClass.armour.includes("none") ? true : false}
        />  
        
        <span className="radio--label">Leather (AC 12) - 20gp</span>
        </label>
    

        {characterClass.armour.includes("any") && 
        <label className="armour-radio">
        <input
        type="radio"
        value="Chainmail"
        className="form-check-input"
        checked={this.state.armourSelected === "Chainmail"}
        onChange={this.handleOptionChange}
        disabled={characterClass.armour.includes("any") ? false : true}
        />
        <span class="radio--label">Chainmail (AC 14) - 40gp</span>
        </label>}
    

        {characterClass.armour.includes("any") && 
        <label className="armour-radio">
        <input
        type="radio"
        value="Plate mail"
        className="form-check-input"
        checked={this.state.armourSelected === "Plate mail"}
        onChange={this.handleOptionChange}
        disabled={characterClass.armour.includes("any") ? false : true}
        />
        <span class="radio--label">Plate mail (AC 16) - 60gp</span>
        </label>}
    

        {characterClass.armour.includes("any") && 
        <label className="armour-radio">
        <input
        type="checkbox"
        value="Shield"
        className="form-check-input"
        checked={this.state.shieldSelected === true}
        onChange={this.handleShieldChange}
        disabled={characterClass.armour.includes("any") ? false : true}
        />
        Shield (AC +1 bonus) - 10gp
        </label>}

        </div>
            
    <input 
    className="button--buy-armour"
    type="submit" 
    value="Buy" 
    onClick={this.buySelectedArmour} 
    price = {null}
    />
        
        </div>}

        <div className="equipment-container--header">Weapons</div>

        <div className="equipment-restrictions">Allowed Weapons: {characterClass.weapons}</div>

        <div className="weapons-container">

        <select className="weapons-select" value={this.state.weaponSelected} onChange={this.updateSelectedWeapon}>

        {this.weaponsList()}

        </select>

       

        <input className="button--buy-weapon" type="submit" value="Buy" onClick={this.buySelectedWeapon} price = {null}/>

        </div>

        <div className="equipment-container--header">Adventuring Gear</div>


        <div className="gear-container">

        <select className="gear-select" value={this.state.equipmentSelected} onChange={this.updateSelectedEquipment} price={null}>

            {this.equipmentList()}

        </select>

        <input className="button--buy-gear" type="submit" value="Buy" onClick={this.buySelectedEquipment} />

        </div>

        <h3 className="header-default"> Gear </h3>

        <div className="backpack-container">


        <div className="armour-name">Armour:</div>

        <div className="armour-backpack">
            {this.armourBackpack()}
        </div>

        <div className="weapons-name">
            Weapons:
        </div>

        <div className="weapons-backpack">
            {this.weaponsBackpack()}
        </div>



        <div className="gear-name">Gear: </div>

        <div className="gear-backpack">
            {this.equipmentBackpack()}
        </div>

        </div>

        </StickyContainer>



        <button onClick={this.props.showAbilityScreen}>Go Back</button>
    </div>

)
}
}

export default EquipmentScreen