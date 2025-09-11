// 下拉菜单JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有下拉菜单元素
    const dropdowns = document.querySelectorAll('.dropdown');
    const resultDiv = document.getElementById('result');

    // 基础下拉菜单功能
    function initBasicDropdown() {
        const dropdown1 = document.getElementById('dropdown1');
        const dropdownContent1 = document.getElementById('dropdown-content1');

        dropdown1.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(dropdown1.parentElement, dropdownContent1);
        });

        // 选项点击事件
        dropdownContent1.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const value = e.target.getAttribute('data-value');
                const text = e.target.textContent;
                dropdown1.querySelector('span:first-child') ? 
                    dropdown1.childNodes[0].textContent = text :
                    dropdown1.insertAdjacentText('afterbegin', text);
                
                closeDropdown(dropdown1.parentElement, dropdownContent1);
                updateResult('基础下拉菜单', `选择了: ${text} (值: ${value})`);
            }
        });
    }

    // 多级下拉菜单功能
    function initMultiLevelDropdown() {
        const dropdown2 = document.getElementById('dropdown2');
        const dropdownContent2 = document.getElementById('dropdown-content2');

        dropdown2.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(dropdown2.parentElement, dropdownContent2);
        });

        // 处理多级菜单选项点击
        dropdownContent2.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const value = e.target.getAttribute('data-value');
                const text = e.target.textContent;
                
                // 更新按钮文本
                dropdown2.childNodes[0].textContent = text;
                
                closeDropdown(dropdown2.parentElement, dropdownContent2);
                updateResult('多级下拉菜单', `选择了: ${text} (值: ${value})`);
            }
        });
    }

    // 搜索下拉菜单功能
    function initSearchableDropdown() {
        const searchInput = document.getElementById('search-input');
        const searchDropdown = document.getElementById('search-dropdown');
        const searchContainer = searchInput.parentElement.parentElement;

        searchInput.addEventListener('focus', function() {
            showDropdown(searchContainer, searchDropdown);
        });

        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const options = searchDropdown.querySelectorAll('a');
            
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    option.classList.remove('hidden');
                } else {
                    option.classList.add('hidden');
                }
            });
            
            showDropdown(searchContainer, searchDropdown);
        });

        // 搜索选项点击事件
        searchDropdown.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                const value = e.target.getAttribute('data-value');
                const text = e.target.textContent;
                searchInput.value = text;
                closeDropdown(searchContainer, searchDropdown);
                updateResult('搜索下拉菜单', `选择了: ${text} (值: ${value})`);
            }
        });
    }

    // 多选下拉菜单功能
    function initMultiSelectDropdown() {
        const multiDropdown = document.getElementById('multi-dropdown');
        const multiDropdownContent = document.getElementById('multi-dropdown-content');
        const selectedText = multiDropdown.querySelector('.selected-text');

        multiDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleDropdown(multiDropdown.parentElement, multiDropdownContent);
        });

        // 复选框变化事件
        multiDropdownContent.addEventListener('change', function(e) {
            if (e.target.type === 'checkbox') {
                updateMultiSelectDisplay();
            }
        });

        function updateMultiSelectDisplay() {
            const checkedBoxes = multiDropdownContent.querySelectorAll('input[type="checkbox"]:checked');
            const selectedItems = Array.from(checkedBoxes).map(cb => cb.getAttribute('data-label'));
            
            if (selectedItems.length === 0) {
                selectedText.textContent = '选择技能';
            } else if (selectedItems.length === 1) {
                selectedText.textContent = selectedItems[0];
            } else {
                selectedText.textContent = `已选择 ${selectedItems.length} 项`;
            }

            // 更新结果显示
            const selectedValues = Array.from(checkedBoxes).map(cb => cb.value);
            updateResult('多选下拉菜单', `选择了: ${selectedItems.join(', ')} (值: ${selectedValues.join(', ')})`);
        }
    }

    // 通用下拉菜单控制函数
    function toggleDropdown(dropdown, content) {
        const isActive = dropdown.classList.contains('active');
        
        // 关闭所有其他下拉菜单
        closeAllDropdowns();
        
        if (!isActive) {
            showDropdown(dropdown, content);
        }
    }

    function showDropdown(dropdown, content) {
        dropdown.classList.add('active');
        content.classList.add('show');
    }

    function closeDropdown(dropdown, content) {
        dropdown.classList.remove('active');
        content.classList.remove('show');
    }

    function closeAllDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const content = dropdown.querySelector('.dropdown-content');
            if (content) {
                content.classList.remove('show');
            }
        });
    }

    // 更新结果显示
    function updateResult(menuType, result) {
        const timestamp = new Date().toLocaleTimeString('zh-CN');
        const resultHTML = `
            <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 5px; border-left: 3px solid #667eea;">
                <strong>${menuType}</strong><br>
                ${result}<br>
                <small style="color: #999;">时间: ${timestamp}</small>
            </div>
        `;
        resultDiv.innerHTML = resultHTML + resultDiv.innerHTML;
    }

    // 点击外部关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        const activeDropdown = document.querySelector('.dropdown.active');
        if (!activeDropdown) return;

        const content = activeDropdown.querySelector('.dropdown-content.show');
        if (!content) return;

        const options = content.querySelectorAll('a:not(.hidden), .checkbox-item');
        const currentFocus = content.querySelector('.focused');
        let currentIndex = currentFocus ? Array.from(options).indexOf(currentFocus) : -1;

        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                currentIndex = (currentIndex + 1) % options.length;
                setFocus(options, currentIndex);
                break;
            case 'ArrowUp':
                e.preventDefault();
                currentIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
                setFocus(options, currentIndex);
                break;
            case 'Enter':
                e.preventDefault();
                if (currentFocus) {
                    if (currentFocus.tagName === 'A') {
                        currentFocus.click();
                    } else if (currentFocus.classList.contains('checkbox-item')) {
                        const checkbox = currentFocus.querySelector('input[type="checkbox"]');
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                }
                break;
            case 'Escape':
                closeAllDropdowns();
                break;
        }
    });

    function setFocus(options, index) {
        // 移除之前的焦点
        options.forEach(option => option.classList.remove('focused'));
        
        // 设置新焦点
        if (options[index]) {
            options[index].classList.add('focused');
            options[index].scrollIntoView({ block: 'nearest' });
        }
    }

    // 添加焦点样式
    const style = document.createElement('style');
    style.textContent = `
        .dropdown-content a.focused,
        .checkbox-item.focused {
            background-color: #667eea !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);

    // 初始化所有下拉菜单
    initBasicDropdown();
    initMultiLevelDropdown();
    initSearchableDropdown();
    initMultiSelectDropdown();

    // 添加一些示例数据到结果显示
    updateResult('系统', '下拉菜单已初始化完成，请开始使用！');
});
