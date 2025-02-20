git add .

# Prompt for commit message
read -p "Enter the commit message: " MESSAGE

git commit -m "$MESSAGE"

if pnpm build; then
    echo "Build successful. Pushing code..."
    git push
else
    echo "Build failed. Fix errors before pushing."
fi