(function () {
    const placeholderDiv = document.createElement("div");
    placeholderDiv.id = 'az-tc-task-copy--chrome-extension--buttons-panel';

    const copyTaskAndRequirementButton = createCopyButton();
    const copyTaskButton = createCopyTaskOnlyButton();

    placeholderDiv.append(copyTaskAndRequirementButton);
    placeholderDiv.append(copyTaskButton);

    window.addEventListener("load", function () {
        jQuery(".tbTile.childTbTile")
        .mouseover(function () {
            jQuery(this).append(placeholderDiv);
        })
        .mouseout(function () {
            jQuery(this).remove(placeholderDiv);
        });
    });

    function createCopyButton() {
        const copyButton = document.createElement("button");
        copyButton.id = "az-tc-task-copy--chrome-extension--copy-button";

        copyButton.onclick = (e) => {
            getText = (prefix, element) => {
                const id = $(element).find(".id").text();
                const text = $(element).find(".clickable-title").text();
                return `${prefix} ${id}: ${text}`;
            };

            const taskContent = $(e.target).parent().prev(".tbTileContent");
            const td = taskContent.parent().parent();
            const requirementContent = $(td).prevAll(".taskboard-parent:first");

            const requirementText = getText("Requirement", requirementContent);
            const taskText = getText("Task", taskContent);
            const taskId = $(taskContent).find(".id").text();

            const reqTask = requirementText + "\n" + taskText;

            chrome.runtime.sendMessage({
                description: reqTask,
                taskId: taskId,
            });
        };
        return copyButton;
    }

    function createCopyTaskOnlyButton() {
        const copyButton = document.createElement("button");
        copyButton.id = "az-tc-task-copy--chrome-extension--copy-task-button";

        copyButton.onclick = (e) => {
            getText = (prefix, element) => {
                const id = $(element).find(".id").text();
                const text = $(element).find(".clickable-title").text();
                return `${prefix} ${id}: ${text}`;
            };

            const taskContent = $(e.target).parent().prev(".tbTileContent");
            const taskText = getText("Task", taskContent);

            navigator.clipboard.writeText(taskText);
        };
        return copyButton;
    }
})();
