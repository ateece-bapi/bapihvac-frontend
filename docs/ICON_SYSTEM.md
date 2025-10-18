# BAPI HVAC Icon System

A comprehensive, professional icon system built with Lucide React for the BAPI HVAC frontend application.

## 🎯 **Why This Icon System?**

### **Design Team Integration**
- ✅ **Figma Plugin Available** - Designers can use the same icons in Figma
- ✅ **Consistent Design Language** - 24x24px grid system, stroke-based
- ✅ **Professional Grade** - Used by Vercel, Linear, and other top companies

### **Developer Experience**  
- ✅ **TypeScript Native** - Full intellisense and type safety
- ✅ **Tree-Shakable** - Only bundles icons you actually use
- ✅ **ShadCN Compatible** - Perfect for future component libraries
- ✅ **Centralized Management** - All icons managed in one place

## 🔧 **Usage**

### **Basic Usage**
```tsx
import { Icon } from '@/components/ui';

// Simple icon
<Icon name="thermometer" />

// With size and styling
<Icon name="sensor" size="lg" className="text-blue-600" />

// Size presets
<Icon name="gauge" size="xs" />   // 12px
<Icon name="wind" size="sm" />    // 16px  
<Icon name="zap" size="md" />     // 20px (default: 24px)
<Icon name="settings" size="lg" />   // 24px
<Icon name="activity" size="xl" />   // 32px
<Icon name="gauge" size="2xl" />     // 48px
```

### **Direct Import (Advanced)**
```tsx
import { Thermometer, Gauge, Wind } from '@/components/ui/Icon';

<Thermometer size={24} className="text-red-500" />
```

## 📚 **Available Icons**

### **HVAC Specific**
- `thermometer` - Temperature sensors, thermal products
- `gauge` - Pressure sensors, measurement devices  
- `wind` - Airflow, ventilation products
- `zap` - Electrical sensors, power monitoring
- `activity` - Humidity, environmental monitoring
- `sensor` - General sensors and IoT devices
- `transmitter` - Data transmission devices
- `wireless` - Wireless/WiFi products
- `bluetooth` - Bluetooth connectivity
- `wired` - Wired connections
- `cable` - Cable and connectivity

### **Navigation & UI**
- `menu` - Mobile menu toggle
- `close` - Close buttons, dismiss actions
- `search` - Search functionality
- `cart` - Shopping cart
- `home` - Home page navigation
- `arrowLeft`/`arrowRight` - Navigation
- `chevronDown`/`chevronUp` - Dropdowns

### **Status & Feedback**
- `success` - Success states, in stock
- `error` - Error states, out of stock  
- `warning` - Warning messages
- `info` - Information display

### **Actions**
- `plus`/`minus` - Add/remove actions
- `edit` - Edit functionality
- `delete` - Delete actions
- `download`/`upload` - File operations
- `share` - Social sharing
- `copy` - Copy to clipboard
- `show`/`hide` - Toggle visibility

### **Contact & Support**
- `phone` - Phone contact
- `email` - Email contact  
- `location` - Address, location
- `calendar` - Scheduling, dates
- `clock` - Time, hours
- `document` - Documentation, files

## 🎨 **Design Guidelines**

### **HVAC Product Type Detection**
The system automatically suggests appropriate icons based on product names:

```tsx
// Automatic icon selection in ProductCard
const getProductIcon = (product: WooCommerceProduct) => {
  const name = product.name.toLowerCase();
  const category = product.categories?.[0]?.name?.toLowerCase() || '';
  
  if (name.includes('sensor')) return 'sensor';
  if (name.includes('transmitter')) return 'transmitter';  
  if (name.includes('temperature')) return 'thermometer';
  if (name.includes('pressure')) return 'gauge';
  if (name.includes('humidity')) return 'activity';
  
  return 'sensor'; // Default
};
```

### **Size Guidelines**
- **xs (12px)** - Status indicators, badges
- **sm (16px)** - Inline text icons, small buttons  
- **md (20px)** - Standard interface elements
- **lg (24px)** - Primary navigation, main actions
- **xl (32px)** - Feature highlights, empty states
- **2xl (48px)** - Hero sections, large placeholders

### **Color Conventions**
```css
/* BAPI Brand Colors */
.text-bapi-blue      /* Primary actions, links */
.text-gray-400       /* Inactive states */
.text-green-500      /* Success, in stock */
.text-red-500        /* Errors, out of stock */
.text-amber-500      /* Warnings, attention */
```

## 🔄 **Figma Workflow**

### **For Designers:**
1. Install the **Lucide** Figma plugin
2. Use the same icon names as in our system
3. Maintain 24x24px artboard for consistency
4. Export with 2px stroke width (default)

### **For Developers:**
1. Reference designer's icon choices
2. Use matching icon names from our system
3. Apply consistent sizing and colors
4. Maintain semantic meaning across components

## 🚀 **Pro Developer Benefits**

✅ **Type Safety** - No more string typos  
✅ **Bundle Optimization** - Tree-shaking eliminates unused icons  
✅ **Design Consistency** - Single source of truth  
✅ **Scalability** - Easy to add new icons  
✅ **Maintainability** - Centralized configuration  
✅ **Performance** - SVG-based, optimized rendering  

---

This icon system provides a **professional foundation** for the BAPI HVAC frontend, ensuring design consistency and developer productivity across the application.