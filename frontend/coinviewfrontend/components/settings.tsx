export default function settings(){
 return (
    <div className ="settings.style">
       <h2>Settings</h2>
        <label>
        Language:
        <select defaultValue="English">
          <option>English</option>
          <option>Français</option>
        </select>
      </label>
      <label>
        Currency:
        <select defaultValue="$">
          <option>$</option>
          <option>€</option>
        </select>
      </label>
      <label>
        Dark Mode:
        <input type="checkbox" />
      </label>
    </div>





 );
}